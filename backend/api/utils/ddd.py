from dotenv import load_dotenv
import os
import requests
from string import punctuation
import re


load_dotenv()

DOG_DIE_KEY = os.getenv("DOG_DIE_KEY")

OMDB_API_KEY = os.getenv("OMDB_API_KEY")


def remove_punctuation(text: str) -> str:
    clean = re.sub(r"\(.*?\)", "", text)
    return clean.translate(str.maketrans("", "", punctuation))


def get_ddd(dddid: str) -> list | None:
    if dddid is None:
        return None
    headers = {"Accept": "application/json", "x-api-key": DOG_DIE_KEY}
    url = f"https://www.doesthedogdie.com/media/{dddid}"
    api_call = requests.get(url, headers=headers)
    data = api_call.json()
    # active = []
    warnings = []
    for topic in data["topicItemStats"]:
        if topic["yesSum"] - topic["noSum"] >= 5:
            # active.append(topic)
            warnings.append(topic["topic"]["name"])
    return warnings


def search_ddd(searchTerm: str, year: str) -> str | None:
    cleansearchTerm = remove_punctuation(searchTerm)
    url = f"https://www.doesthedogdie.com/dddsearch?q={cleansearchTerm}"
    headers = {"Accept": "application/json", "x-api-key": DOG_DIE_KEY}
    api_call = requests.get(url, headers=headers)
    correct = None
    for item in api_call.json()["items"]:
        if item["name"].lower() == searchTerm.lower() and item["releaseYear"] == year:
            correct = item
            break
    if correct is not None:
        return correct["id"]
    return None
