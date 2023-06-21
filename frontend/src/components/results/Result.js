/**
 * This component is a singular movie result that will be a part
 * of the ResultsGrid.
 * 
 * Each movie result is a Material-UI Card.
 */
import React, { useState } from 'react';

import MovieModal from '../../modal/MovieModal';
import ResultButton from './ResultButton';
import { useDispatch } from 'react-redux';
import { setDetailedDefault } from '../../app/movieSlice';
import { Card, CardActions, CardMedia, CardContent, Typography } from '@mui/material';

// Use a question mark as a placeholder image for movies that have no poster.
const noPosterImg = "https://upload.wikimedia.org/wikipedia/commons/2/28/Question_mark_white.png";

// To show more of each movie poster, make the height of the
// images larger than the default.


function Result(props) {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true); //hit the api to get the movie details
    const handleClose = () => {
        dispatch(setDetailedDefault());
        setOpen(false);
    } //close the modal
    return (
        <Card style={{ backgroundColor: "#9f94a0" }}>
            <CardMedia
                sx={{ height: 550, backgroundColor: "#9f94a0", cursor: "pointer", "&:hover": { opacity: 0.5 } }}
                component="img"
                className="open-modal"
                onClick={ handleOpen }
                alt="Movie Poster"
                image={
                    // If there is a poster image URL provided (not 'N/A'), use it.
                    // Otherwise, use the placeholder image.
                    props.data['Poster'] !== 'N/A' ? props.data['Poster'] : noPosterImg
                }
                title="Movie Poster"
            />
            <CardContent>
                { open && <MovieModal open={open} handleClose={ handleClose } data={props.data} />}
                <Typography gutterBottom variant="h6" component="h6" color="#603840" noWrap>
                    {props.data['Title']}
                </Typography>
                <Typography variant="body1" color="#603840" component="p">
                    {props.data['Year']}
                </Typography>
            </CardContent>
            <CardActions style={{ justifyContent: 'right' }}>
                <ResultButton data={props.data} close={handleClose}/>
            </CardActions>
        </Card>
    );
}

export default Result;