from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from dotenv import load_dotenv
import os
import requests

load_dotenv()

OMDB_API_KEY = os.getenv("OMDB_API_KEY")
# Create your views here.
class SearchView(APIView):
    def get(self, request, *args, **kwargs):
        query = request.data['query']
        url = "http://www.omdbapi.com/?s=\"" + query + "\"&apikey="+OMDB_API_KEY # type: ignore
        api_call = requests.get(url)
        print(api_call.json()) # check if data is already in database and add saved to json.
        # maybe add pagination to api call
        return Response({'data': api_call.json()})
    
class SaveView(APIView):
    def post(self, request, *args, **kwargs):
        imdbID = request.data['imdbID']
        url = "http://www.omdbapi.com/?i=" + imdbID + "&apikey="+OMDB_API_KEY # type: ignore
        api_call = requests.get(url) # serialize data and save to db
        print(api_call.json())
        return Response({'respose': "true"})