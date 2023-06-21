from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from dotenv import load_dotenv
from .models import SavedResult
from .serializers import SavedSerializer
import os
import requests
from pprint import pprint

load_dotenv()

OMDB_API_KEY = os.getenv("OMDB_API_KEY")
# Create your views here.
class SearchView(APIView):
    def get(self, request, *args, **kwargs):
        query = request.query_params.get('query')
        url = "http://www.omdbapi.com/?s=\"" + query + "\"&apikey="+OMDB_API_KEY+"&type=movie" # type: ignore
        api_call = requests.get(url)
        data = api_call.json()
        print(data['totalResults'])
        search_result = data['Search']
        # check if data is already in database and add saved to json.
        for i in range(len(search_result)):
            search_result[i]['saved'] = SavedResult.objects.filter(imdbID=search_result[i]['imdbID']).exists()
        data['Search'] = search_result
        # maybe add pagination to api call
        return Response(data)
    
class SaveView(APIView):
    def post(self, request, *args, **kwargs):
        imdbID = request.data['imdbID']
        if SavedResult.objects.filter(imdbID=imdbID).exists():
            return Response({'Response': "false"})
        url = "http://www.omdbapi.com/?i=" + imdbID + "&apikey="+OMDB_API_KEY # type: ignore
        api_call = requests.get(url) # serialize data and save to db
        data = api_call.json()
        if data['Response'] == "True":
            serializer = SavedSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response({'Response': "true"})
            else:
                print(serializer.errors)
                return Response({'Response': "false"})
    

class MoviesView(APIView):
    #gets all the movies saved to the database
    def get(self, request, *args, **kwargs):
        movies = SavedResult.objects.all()
        serialized = SavedSerializer(movies, many=True)
        return Response(serialized.data)

class DetailedMovieView(APIView):
    #probably needs more error checking
    #view for getting detailed movie info for modal/popup when clicking poster
    def get(self, request, *args, **kwargs):
        imdbID = request.data['imdbID']
        url = "http://www.omdbapi.com/?i=" + imdbID + "&apikey="+OMDB_API_KEY
        api_call = requests.get(url)
        data = api_call.json()
        if data['Response'] == "True":
            data['saved'] = SavedResult.objects.filter(imdbID=imdbID).exists()
        return Response(data)
        
class DeleteView(APIView):
    def post(self, request, *args, **kwargs):
        imdbID = request.data['imdbID']
        if SavedResult.objects.filter(imdbID=imdbID).exists():
            movie = SavedResult.objects.get(imdbID=imdbID)
            movie.delete()
            return Response({'Response': "true"})
        else:
            return Response({'Response': "false"})