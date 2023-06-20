import React, { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { saveMovie } from '../../app/movieSlice';
import { deleteMovie } from '../../app/movieSlice';

import { Button } from '@mui/material';

import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';

function ResultButton(props){
    const dispatch = useDispatch();
    const [saved, setSaved] = useState(props.data['saved']);
    const handleSaveClick = (event, imdbID) => {
        setSaved(true);
        dispatch(saveMovie(imdbID));
        
    };
    useEffect(() => {
        setSaved(props.data['saved']);
    },[props.data['imdbID']]);
    if (saved){
        return (
            <Button
                variant="outlined"
                size="small"
                color = "error"
                startIcon={<DeleteIcon />}
                onClick={(e) => {
                    setSaved(false);
                    dispatch(deleteMovie(props.data['imdbID']));
                }}
            >
                Delete
            </Button>
        );
    }
    return (
        <Button
          variant="outlined"
          size="small"
          startIcon={<SaveIcon />}
          color = "success"
          disabled={ saved }
          onClick={(e) => {
            handleSaveClick(e, props.data['imdbID']);
          }} 
        >
            Save
        </Button>
    );
}

export default ResultButton;