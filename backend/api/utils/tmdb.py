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
    return [baseURL, backdropSizes, posterSizes, lang]


def get_movie_details(movieid: int) -> dict | None:
    url = f"https://api.themoviedb.org/3/movie/{movieid}"
    headers = {
        "accept": "application/json",
        "Authorization": "Bearer " + TMDB_TOKEN,
    }
    api_call = requests.get(url, headers=headers)
    data = api_call.json()
    return data


def tmdb_search_imdbid(imdbid: str) -> dict | None:
    url = f"https://api.themoviedb.org/3/find/{imdbid}?external_source=imdb_id&language=en,null"
    headers = {
        "accept": "application/json",
        "Authorization": "Bearer " + TMDB_TOKEN,
    }
    api_call = requests.get(url, headers=headers)
    data = api_call.json()
    # add error checking lol
    return data


def get_tmdb_data(imdbid: str):
    data = {}
    base, backdropsizes, posterSizes, lang = get_base_image_url()
    data["tmdbid"] = tmdb_search_imdbid(imdbid)["movie_results"][0]["id"]
    movie_data = get_movie_details(data["tmdbid"])
    pprint(movie_data)
    data["tmdbposter"] = movie_data["poster_path"]
    data["tmdbbackdrop"] = movie_data["backdrop_path"]
    data["tmdbURL"] = f"https://www.themoviedb.org/movie/{data['tmdbid']}"
    return data


get_tmdb_data("tt1517268")
