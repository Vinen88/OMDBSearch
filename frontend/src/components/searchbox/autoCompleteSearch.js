import React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { selectMovies, fetchMovies } from '../../app/movieSlice';

export const AutoSearch = (props) => {
    const { setQuery, query } = props
    const dispatch = useDispatch();
    const movieResults = useSelector(selectMovies);
    return (
        <Stack spacing={2} sx={{ width: 300 }} >
            <Autocomplete
                freeSolo
                id="free-solo-search"
                options={movieResults.map((option) => option.Title)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search input"
                        onChange={e => setQuery(e.target.value)}
                        onKeyDown={(e) => {
                            // For convenience, if the user presses the Enter key inside the search box,
                            // fetch the movie results.
                            if (e.key === 'Enter') {
                                dispatch(fetchMovies(query));
                            }
                        }}
                        InputProps={{
                            ...params.InputProps,
                            type: 'search'
                        }}
                    />
                )}
            />
        </Stack >
    );
}