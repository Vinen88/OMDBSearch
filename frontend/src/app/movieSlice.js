import { createSlice } from '@reduxjs/toolkit';

import axios from 'axios';


const databaseurl = 'http://localhost:8000';

export const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
      results: [],
    },
    reducers: {
      /**
       * Sets the results state to the provided array (action.payload)
       */
      setResults: (state, action) => { 
        state.results = action.payload;
      },
  
      /**
       * Removes the movie from the results state array located at the
       * provided index (action.payload)
       */
      removeResult: (state, action) => {
        state.results.splice(action.payload, 1);
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
    if (query === undefined ) {
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
        alert(response.data['Error']);
      }
    }).catch(err => {
      alert(err);
    })
};

export const saveMovie = movie => dispatch => {

  axios.post(databaseurl + "/save/", {'imdbID': movie}
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

// Export the non-asynchronous reducer actions: setResults and removeResult
export const { setResults, removeResult } = moviesSlice.actions;

// Export the movie results selector
export const selectMovies = state => state.movies.results;

// Export the movies reducer
export default moviesSlice.reducer;