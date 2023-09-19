import asyncio
import aiohttp
from dotenv import load_dotenv
import os

load_dotenv()

OMDB_API_KEY = os.getenv("OMDB_API_KEY")


async def getMovie(url, session):
    try:
        async with session.get(url) as response:
            response = await response.read()
    except Exception as e:
        print(e)
        return None


async def getMovieDetails(imdbID, title, year):
    omdb_url = f"http://www.omdbapi.com/?i={imdbID}&apikey={OMDB_API_KEY}"
    async with aiohttp.ClientSession() as session:
        response = await getMovie(omdb_url, session)
        if response is not None:
            return response
        else:
            return None
