import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { fetchMovies, fetchSavedMovies } from '../../app/movieSlice';
import SearchIcon from '@mui/icons-material/Search';
import SaveIcon from '@mui/icons-material/Save';
import { Typography } from '@mui/material';



export default function ToggleButtons(props) {
    const [resultsListType, setResultsListType] = useState('search'); // Contains the query typed in the search field
    const dispatch = useDispatch();
    const handleChange = (event, newResultsListType) => {
        setResultsListType(newResultsListType);
        if (newResultsListType === 'search') {
            dispatch(fetchMovies(props.data));
        } else {
            dispatch(fetchSavedMovies());
        }
    };
    return( 
        <ToggleButtonGroup
         color="primary"
         value={resultsListType}
         exclusive
         onChange={handleChange}
         >
            <ToggleButton value="search" aria-label="search">
                <SearchIcon />
                Search
            </ToggleButton>
            <ToggleButton value="saved" aria-label="saved">
                <SaveIcon />
                Saved Movies
            </ToggleButton>
         </ToggleButtonGroup>
    );
}