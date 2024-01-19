import asyncio
import os
from pprint import pprint

import httpx
from dotenv import load_dotenv

load_dotenv()

OMDB_API_KEY = os.getenv("OMDB_API_KEY")
DOG_DIE_KEY = os.getenv("DOG_DIE_KEY")
TMDB_API_KEY = os.getenv("TMDB_API_KEY")
TMDB_TOKEN = os.getenv("TMDB_TOKEN")
OMDB_URL_BASE = "http://www.omdbapi.com/?i={}&apikey={}"
DDD_URL_SEARCH = "https://www.doesthedogdie.com/dddsearch?q={}"
DDD_URL = "https://www.doesthedogdie.com/media/{}"


def create_urls(imdbID, title, year):
    urls = {}
    urls["OMDB"] = OMDB_URL_BASE.format(imdbID, OMDB_API_KEY)
    urls["DDD"] = DDD_URL_SEARCH.format(f"{title} {year}")
    urls["TMDB_config"] = "https://api.themoviedb.org/3/configuration"
    urls["TMDB"] = f"https://api.themoviedb.org/3/find/{imdbID}?external_source=imdb_id&language=en,null"
    return urls


def create_tasks(urls, client):
    tasks = []
    ddd_headers = {"Accept": "application/json", "x-api-key": DOG_DIE_KEY}
    tmdb_headers = {
        "accept": "application/json",
        "Authorization": f"Bearer {TMDB_TOKEN}",
    }
    for key, value in urls.items():
        if key == "DDD":
            tasks.append(client.get(value, headers=ddd_headers))
        elif "TMDB" in key:
            tasks.append(client.get(value, headers=tmdb_headers))
        else:
            tasks.append(client.get(value))
    return tasks


async def make_async_requests(urls):
    async with httpx.AsyncClient() as client:
        tasks = create_tasks(urls, client)
        results = await asyncio.gather(*tasks)
        return results


def getMovieDetails(imdbID, title, year):
    urls = create_urls(imdbID, title, year)
    results = asyncio.run(make_async_requests(urls))
    for i, result in enumerate(results):
        # print(result.text)
        url = str(result.url)
        if "themoviedb" in url and "configuration" in url:
            pprint(result.json())
        elif "themoviedb" in url:
            print("TMDB")
        elif "doesthedogdie" in url:
            print("DDD")
            dddid = get_dddid(result, title, year)
        elif "omdbapi" in url:
            data = result.json()
    data["dddid"] = dddid
    data["dddURL"] = f"https://www.doesthedogdie.com/media/{dddid}"
    # TODO: fetch warnings from DDD
    data["saved"] = True
    return results


def get_dddid(searchResults, searchTerm, year):
    correct = None
    for item in searchResults.json()["items"]:
        if item["name"].lower() == searchTerm.lower() and item["releaseYear"] == year:
            correct = item
            break
    if correct is not None:
        return correct["id"]
