import asyncio
import aiohttp
from dotenv import load_dotenv
import os

load_dotenv()

OMDB_API_KEY = os.getenv("OMDB_API_KEY")
DOG_DIE_KEY = os.getenv("DOG_DIE_KEY")
TMDB_API_KEY = os.getenv("TMDB_API_KEY")
TMDB_TOKEN = os.getenv("TMDB_TOKEN")
OMDB_URL_BASE = "http://www.omdbapi.com/?i={}&apikey={}"
DDD_URL_SEARCH = "https://www.doesthedogdie.com/dddsearch?q={}"
DDD_URL = "https://www.doesthedogdie.com/media/{}"


def create_urls(imdbID, title, year):
    pass


async def getMovie(url, session):
    try:
        async with session.get(url) as response:
            response = await response.read()
    except Exception as e:
        print(e)
        return None


async def getMovieDetails(imdbID, title, year):
    omdb_url = OMDB_URL_BASE.format(imdbID, OMDB_API_KEY)

    async with aiohttp.ClientSession() as session:
        response = await getMovie(omdb_url, session)
        if response is not None:
            return response
        else:
            return None
