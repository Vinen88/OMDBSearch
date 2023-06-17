import { createSlice } from '@reduxjs/toolkit';

import axios from 'axios';

const omdbUrl = 'http://www.omdbapi.com/';

export const movieSlice = createSlice({
    name: 'movie',
    initialState: {
        results: [],
    },
    reducers: {
        setResults: (state, action) => {
            state.results = action.payload;
        },
    },
});

export const searchMovies = query => dispatch => {
    axios.get( omdbUrl, {
        params: {
            'apikey': process.env.REACT_APP_OMDB_API_KEY,
            's': query,
            'type': 'movie',
        },
    },
    ).then( response => {
        if (response.data['Response'] === 'True') {
            dispatch(setResults(response.data['Search']));
        } else {
            alert(response.data['Error']);
        }
        }).catch( err => {
            alert(err);
        })

    };

export const { setResults } = movieSlice.actions;

export const selectMovies = state => state.movie.results;

export default movieSlice.reducer;
