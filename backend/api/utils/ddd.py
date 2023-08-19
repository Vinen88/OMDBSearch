from dotenv import load_dotenv
import os
import requests
from pprint import pprint

load_dotenv()

DOG_DIE_KEY = os.getenv("DOG_DIE_KEY")

OMDB_API_KEY = os.getenv("OMDB_API_KEY")


def get_ddd(searchTerm: str):
    url = f"https://www.doesthedogdie.com/dddsearch?q={searchTerm}"
    headers = {"Accept": "application/json", "x-api-key": DOG_DIE_KEY}
    api_call = requests.get(url, headers=headers)
    pprint(api_call.json())
