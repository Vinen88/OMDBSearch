import { createSlice } from '@reduxjs/toolkit';

import axios from 'axios';


const databaseurl = 'http://localhost:8000';

export const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    results: [],
    detailed: {},
    searched: false,
  },
  reducers: {
    /**
     * Sets the results state to the provided array (action.payload)
     */
    setResults: (state, action) => {
      state.results = action.payload;
    },

    setDetailed: (state, action) => {
      state.detailed = action.payload;
    },

    setDetailedDefault: (state) => {
      state.detailed = {};
    },

    /**
     * Removes the movie from the results state array located at the
     * provided index (action.payload)
     */
    removeResult: (state, action) => {
      //state.results.splice(action.payload, 1);
      // remove the movie from state.results that matches the provided imdbID
      state.results = state.results.filter(movie => movie.imdbID !== action.payload);
    },
    setSearched: (state, action) => {
      state.searched = action.payload;
    },
  },
});

/**
 * Retrieves movies from the OMDb API that match the provided query, and
 * sets the results state to the retrieved data.
 * @param {*} query 
 */
export const fetchMovies = query => dispatch => {

  // Perform a GET request on the API for movies matching the query.
  dispatch(setSearched(true));

  if (query === undefined || query === "") {
    dispatch(setResults([]));
    return;
  }
  axios.get(databaseurl + "/search/",
    {
      params: {
        'query': query,
      },
    },
  ).then(response => {
    // If movie data was successfully retrieved, update the results state
    // to the retrieved data. Otherwise, show the user what the error is.
    // If response.data['Response'] is 'True', then the search was successful.
    if (response.data['Response'] === 'True') {
      dispatch(setResults(response.data['Search']));
    } else {
      console.log(response.data['Error']);
      dispatch(setResults([]));
    }
  }).catch(err => {
    console.log(err);
    dispatch(setResults([]));
  })
};

export const saveMovie = movie => dispatch => {

  axios.post(databaseurl + "/save/", { 'imdbID': movie }
  ).then(response => {
    if (response.data['Response'] === 'true') {
      console.log("Saved");
    } else {
      console.log("Not saved - something went wrong or already in DB");
    }
  }).catch(err => {
    alert(err);
  })

};

export const fetchSavedMovies = () => dispatch => {
  axios.get(databaseurl + "/movies/",
  ).then(response => {
    if (response.data) {
      dispatch(setResults(response.data));
    } else {
      console.log("Error loading saved movies");
    }
  }).catch(err => {
    alert(err);
  })
};

export const deleteMovie = movie => dispatch => {
  // update the results state to remove the movie with the provided imdbID
  axios.post(databaseurl + "/delete/", { 'imdbID': movie }
  ).then(response => {
    if (response.data['Response'] === 'true') {
      dispatch(removeResult(movie));
      console.log("Deleted");
    } else {
      console.log("Not deleted - something went wrong");
    }
  }).catch(err => {
    alert(err);
  })
};


export const fetchmoviedetails = (imdbID, title, year) => dispatch => {
  axios.get(databaseurl + "/detailedmovie/", {
    params: {
      'imdbID': imdbID,
      'title': title,
      'year': year,
    },
  },
  ).then(response => {
    if (response.data) {
      console.log(response.data);
      dispatch(setDetailed(response.data));
    } else {
      console.log("Error loading movie details");
    }
  }).catch(err => { alert(err); })
};

// Export the non-asynchronous reducer actions: setResults and removeResult
export const { setResults, removeResult, setDetailed, setDetailedDefault, setSearched } = moviesSlice.actions;

// Export the movie results selector
export const selectMovies = state => state.movies.results;

export const selectDetailed = state => state.movies.detailed;

export const selectSearched = state => state.movies.searched;

// Export the movies reducer
export default moviesSlice.reducer;