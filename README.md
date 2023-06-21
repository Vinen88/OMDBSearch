# OMDBSearch

## Frontend

In the frontend directory, you can run:

### `npm install`

installs required packages

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Backend

in the backend directory

### Before you start

You need an OMDB API key which you can get from [https://www.omdbapi.com/apikey.aspx](https://www.omdbapi.com/apikey.aspx)
once you have your OMDBAPI key you need to put it in an .env file within the backend directory. You can use the provided .envexample file and rename it to .env after you are done.

### Create your environment

create a venv see [https://docs.python.org/3/library/venv.html](https://docs.python.org/3/library/venv.html) for more details

### `python -m pip install -r requirements.txt`

installs required libraries for it to run.

### `./manage.py migrate`

you first need to build your sqlite database so run this command from the backend directory. the manage.py file should be within your current directory.

### `./manage.py runserver`

this starts the backend at [http://localhost:8000](http://localhost:8000) there isn't much of interest to see here.

## Features

You can click on a movie poster to see detailed results or the save button to save it to the database, you can see saved movies by clicking the saved movie toggle you can also delete them from here or from search results by clicking the trashcan icon, you can go back to your search results by clicking the search toggle.
