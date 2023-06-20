/**
 * This component is a singular movie result that will be a part
 * of the ResultsGrid.
 * 
 * Each movie result is a Material-UI Card.
 */
import React from 'react';

import { useDispatch } from 'react-redux';
import { saveMovie } from '../../app/movieSlice';

import { Card, CardActions, CardMedia, CardContent, Typography, Button } from '@mui/material';

import SaveIcon from '@mui/icons-material/Save';


// Use a question mark as a placeholder image for movies that have no poster.
const noPosterImg = "https://upload.wikimedia.org/wikipedia/commons/2/28/Question_mark_white.png";

// To show more of each movie poster, make the height of the
// images larger than the default.


const handleClick = (event) => {
  event.currentTarget.disabled = true;
  event.currentTarget.innerText = "Saved";
  event.currentTarget.style.backgroundColor = "#4caf50";
};

function Result(props) {

  const dispatch = useDispatch();
  
  return (
    <Card>
      <CardMedia
        sx={{ height: 500 }}
        component="img"
        alt="Movie Poster"
        image={
          // If there is a poster image URL provided (not 'N/A'), use it.
          // Otherwise, use the placeholder image.
          props.data['Poster'] !== 'N/A' ? props.data['Poster'] : noPosterImg
        }
        title="Movie Poster"
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="h6" noWrap>
          {props.data['Title']}
        </Typography>
        <Typography variant="body1" color="textPrimary" component="p">
          {props.data['Year']}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="outlined"
          size="small"
          startIcon={<SaveIcon />}
          disabled={ props.data['saved'] }
          onClick={(e) => {
            handleClick(e);
            dispatch(saveMovie(props.data['imdbID']));
          }
          } 
        >
          Save
        </Button>
      </CardActions>
    </Card>
  );
}

export default Result;