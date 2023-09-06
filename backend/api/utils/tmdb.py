from dotenv import load_dotenv
import os
import requests
from pprint import pprint


load_dotenv()

TMDB_API_KEY = os.getenv("TMDB_API_KEY")
TMDB_TOKEN = os.getenv("TMDB_TOKEN")


def get_base_image_url() -> dict | None:
    url = "https://api.themoviedb.org/3/configuration"
    headers = {
        "accept": "application/json",
        "Authorization": "Bearer " + TMDB_TOKEN,
    }
    api_call = requests.get(url, headers=headers)
    data = api_call.json()
    baseURL = data["images"]["secure_base_url"]
    backdropSizes = data["images"]["backdrop_sizes"]
    posterSizes = data["images"]["poster_sizes"]
    lang = "?include_image_language=en"
    pprint([baseURL, backdropSizes, posterSizes, lang])
    return [baseURL, backdropSizes, posterSizes, lang]


def get_movie_details(movie_id: int) -> dict | None:
    url = f"https://api.themoviedb.org/3/movie/{movie_id}"
    headers = {
        "accept": "application/json",
        "Authorization": "Bearer " + TMDB_TOKEN,
    }
    api_call = requests.get(url, headers=headers)
    data = api_call.json()
    pprint(data)
    return data


def tmdb_search_imdbid(imdbid: str) -> dict | None:
    url = f"https://api.themoviedb.org/3/find/{imdbid}?external_source=imdb_id&language=en"
    headers = {
        "accept": "application/json",
        "Authorization": "Bearer " + TMDB_TOKEN,
    }
    api_call = requests.get(url, headers=headers)
    data = api_call.json()
    pprint(data)
    return data


get_base_image_url()
