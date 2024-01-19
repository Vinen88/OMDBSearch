import os

import requests
from django.db.utils import IntegrityError
from dotenv import load_dotenv
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import SavedResult
from .serializers import SavedSerializer
from .utils.asyncMovies import getMovieDetails
from .utils.ddd import get_ddd, search_ddd

load_dotenv()

OMDB_API_KEY = os.getenv("OMDB_API_KEY")


# Create your views here.
class SearchView(APIView):
    def get(self, request, *args, **kwargs):
        query = request.query_params.get("query")
        url = f'http://www.omdbapi.com/?s="{query}"&apikey={OMDB_API_KEY}&type=movie'
        api_call = requests.get(url)
        data = api_call.json()
        search_result = data["Search"]
        # check if data is already in database and add saved to json.
        for i in range(len(search_result)):
            search_result[i]["saved"] = SavedResult.objects.filter(imdbID=search_result[i]["imdbID"]).exists()
        data["Search"] = search_result
        # maybe add pagination to api call
        return Response(data)


class SaveView(APIView):
    def post(self, request, *args, **kwargs):
        imdbID = request.data["imdbID"]
        if SavedResult.objects.filter(imdbID=imdbID).exists():
            movie = SavedResult.objects.get(imdbID=imdbID)
            if movie.saved:
                return Response({"Response": "False"})
            movie.saved = True
            movie.save()
            return Response({"Response": "True"})
        url = f"http://www.omdbapi.com/?i={imdbID}&apikey={OMDB_API_KEY}"
        api_call = requests.get(url)  # serialize data and save to db
        data = api_call.json()
        if data["Response"] == "True":
            dddid = search_ddd(data["Title"], data["Year"])
            data["dddWarnings"] = get_ddd(dddid)
            data["dddURL"] = f"https://www.doesthedogdie.com/media/{dddid}"
            data["dddid"] = dddid
            data["saved"] = True
            serializer = SavedSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response({"Response": "true"})
            else:
                print(serializer.errors)
                return Response({"Response": "false"})


class MoviesView(APIView):
    # gets all the movies saved to the database
    def get(self, request, *args, **kwargs):
        movies = SavedResult.objects.all()
        serialized = SavedSerializer(movies, many=True)
        data = []
        for item in serialized.data:
            if item["saved"]:
                data.append(item)
        return Response(data)


class DetailedMovieView(APIView):
    # probably needs more error checking
    # view for getting detailed movie info for modal/popup when clicking poster
    def get(self, request, *args, **kwargs):
        imdbID = request.query_params.get("imdbIB")
        title = request.query_params.get("title")
        year = request.query_params.get("year")
        getMovieDetails(imdbID, title, year)
        if SavedResult.objects.filter(imdbID=imdbID).exists():
            movie = SavedResult.objects.get(imdbID=imdbID)
            serializer = SavedSerializer(movie)
            return Response(serializer.data)
        url = f"http://www.omdbapi.com/?i={imdbID}&apikey={OMDB_API_KEY}"
        api_call = requests.get(url)
        data = api_call.json()
        if data["Response"] == "False":
            return Response(data)
        dddid = search_ddd(data["Title"], data["Year"])
        data["dddWarnings"] = get_ddd(dddid)
        data["dddURL"] = f"https://www.doesthedogdie.com/media/{dddid}"
        data["dddid"] = dddid
        serializer = SavedSerializer(data=data)
        if serializer.is_valid() and dddid is not None:
            try:
                serializer.save()
            except IntegrityError:
                # I dont know why we are getting integrety errors here.
                print(serializer.errors)
        return Response(data)


class DeleteView(APIView):
    def post(self, request, *args, **kwargs):
        imdbID = request.data["imdbID"]
        if SavedResult.objects.filter(imdbID=imdbID).exists():
            movie = SavedResult.objects.get(imdbID=imdbID)
            movie.delete()
            return Response({"Response": "true"})
        else:
            return Response({"Response": "false"})
