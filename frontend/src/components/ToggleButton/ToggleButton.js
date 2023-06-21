import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { fetchMovies, fetchSavedMovies } from '../../app/movieSlice';
import SearchIcon from '@mui/icons-material/Search';
import SaveIcon from '@mui/icons-material/Save';

import styles from './ToggleButton.module.css';


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
        <div className={styles.container}>
            <ToggleButtonGroup
            color="primary"
            value={resultsListType}
            style={{backgroundColor: '#bd8990', color: '#603840', boarderColor: '#603840'}}
            exclusive
            onChange={handleChange}
            >
                <ToggleButton value="search" aria-label="search" style={{color:"#603840"}}>
                    <SearchIcon />
                    Search
                </ToggleButton>
                <ToggleButton value="saved" aria-label="saved" style={{color:"#603840"}}>
                    <SaveIcon />
                    Saved Movies
                </ToggleButton>
            </ToggleButtonGroup>
         </div>
    );
}