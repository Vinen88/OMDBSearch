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
        query = request.data['query']
        url = "http://www.omdbapi.com/?s=\"" + query + "\"&apikey="+OMDB_API_KEY # type: ignore
        api_call = requests.get(url)
        data = api_call.json()
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
        url = "http://www.omdbapi.com/?i=" + imdbID + "&apikey="+OMDB_API_KEY # type: ignore
        api_call = requests.get(url) # serialize data and save to db
        data = api_call.json()
        pprint(data)
        if data['Response'] == "True":
            serializer = SavedSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response({'Response': "true"})
            else:
                return Response({'Response': "false"})
    
    def get(self, request, *args, **kwargs):
        imdbID = request.data['imdbID']
        if SavedResult.objects.filter(imdbID=imdbID).exists():
            data = SavedResult.objects.get(imdbID=imdbID)
            serialized = SavedSerializer(data)
            return Response(serialized.data)
        else:
            return Response({'Response': "false"})