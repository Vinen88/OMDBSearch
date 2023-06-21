import React, { useEffect } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useDispatch } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import { fetchmoviedetails } from "../app/movieSlice";
import { useSelector } from 'react-redux';
import { selectDetailed } from '../app/movieSlice';
import Rating from '@mui/material/Rating';
import { CardContent, Card, CardMedia, CardActions } from "@mui/material";
import ResultButton from "../components/results/ResultButton";

const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 365,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const noPosterImg = "https://upload.wikimedia.org/wikipedia/commons/2/28/Question_mark_white.png";



function MovieModal({ open, handleClose, data }) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchmoviedetails(data['imdbID']));
    }, [data['imdbID']]);
    const detailedMovieResult = useSelector(selectDetailed); // maybe move into useEffect

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Card 
                sx={{ 
                    width: '450px',
                    maxWidth: "90%", 
                    position: 'absolute', 
                    top: '50%', 
                    left: '50%', 
                    transform: 'translate(-50%, -50%)',
                    maxHeight: "95%",
                    overflow: "auto", }}
                variant="outlined"
                >
                    <CardMedia
                        component="img"
                        alt="Movie Poster"
                        height="500"
                        image={detailedMovieResult['Poster'] !== 'N/A' ? detailedMovieResult['Poster'] : noPosterImg}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {detailedMovieResult['Title'] + " (" + detailedMovieResult['Year'] + ")"}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {detailedMovieResult['Genre'] + " | " + detailedMovieResult['Runtime'] + " | " + detailedMovieResult['Rated']}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {detailedMovieResult['Plot']}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <b>Actors: </b>{detailedMovieResult['Actors']}
                        </Typography>
                        {detailedMovieResult['Director'] !== 'N/A' &&
                            <Typography variant="body2" color="text.secondary">
                                <b>Director: </b>{detailedMovieResult['Director']}
                            </Typography>}
                        {detailedMovieResult['Writer'] !== 'N/A' &&
                            <Typography variant="body2" color="text.secondary">
                                <b>Writer(s): </b>{detailedMovieResult['Writer']}
                            </Typography>}
                        {detailedMovieResult['Awards'] !== 'N/A' &&
                            <Typography variant="body2" color="text.secondary">
                                <b>Awards and Nominations: </b>{detailedMovieResult['Awards']}
                            </Typography>}
                        {detailedMovieResult['Released'] !== 'N/A' &&
                            <Typography variant="body2" color="text.secondary">
                                <b>Released: </b>{detailedMovieResult['Released']}
                            </Typography>}
                        {detailedMovieResult['Language'] !== 'N/A' &&
                            <Typography variant="body2" color="text.secondary">
                                <b>Language(s): </b>{detailedMovieResult['Language']}
                            </Typography>}
                        {detailedMovieResult['Production'] !== 'N/A' &&
                            <Typography variant="body2" color="text.secondary">
                                <b>Production: </b>{detailedMovieResult['Production']}
                            </Typography>}
                        {detailedMovieResult['BoxOffice'] !== 'N/A' &&
                            <Typography variant="body2" color="text.secondary">
                                <b>BoxOffice: </b>{detailedMovieResult['BoxOffice']}
                            </Typography>}
                        <Typography component="legend" variant="body2" color="text.secondary">IMDB Rating:</Typography>
                        <Rating name="IMDB Rating" value={Number(detailedMovieResult['imdbRating']) / 2} precision={0.5} readOnly />
                    </CardContent>
                    <CardActions style={{ justifyContent: 'right' }}>
                        <ResultButton data={detailedMovieResult} close={handleClose}/>
                    </CardActions>
                </Card>
            </Modal>
        </div>
    );
}

export default MovieModal;