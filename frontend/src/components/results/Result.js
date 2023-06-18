/**
 * This component is a singular movie result that will be a part
 * of the ResultsGrid.
 * 
 * Each movie result is a Material-UI Card.
 */
import React from 'react';

import { useDispatch } from 'react-redux';
import { removeResult } from '../../app/movieSlice';

import { Card, CardActions, CardMedia, CardContent, Typography, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ClearIcon from '@material-ui/icons/Clear';


// Use a question mark as a placeholder image for movies that have no poster.
const noPosterImg = "https://upload.wikimedia.org/wikipedia/commons/2/28/Question_mark_white.png";

// To show more of each movie poster, make the height of the
// images larger than the default.
const CardPosterMedia = withStyles({
  media: {
    height: '40em',
  },
})(CardMedia);


function Result(props) {

  const dispatch = useDispatch();
  
  return (
    <Card>
      <CardPosterMedia
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
          startIcon={<ClearIcon />}
          onClick={() => dispatch(removeResult(props.index))}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

export default Result;