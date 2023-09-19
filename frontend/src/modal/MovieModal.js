import React, { useEffect } from "react";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useDispatch } from 'react-redux';
import { fetchmoviedetails } from "../app/movieSlice";
import { useSelector } from 'react-redux';
import { selectDetailed, setDetailedDefault } from '../app/movieSlice';
import Rating from '@mui/material/Rating';
import { CardContent, Card, CardMedia, CardActions } from "@mui/material";
import ResultButton from "../components/results/ResultButton";
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';

const noPosterImg = "https://upload.wikimedia.org/wikipedia/commons/2/28/Question_mark_white.png";

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));


function MovieModal({ open, handleClose, data }) {
    const dispatch = useDispatch();
    const [expanded, setExpanded] = React.useState(false);
    useEffect(() => {
        setDetailedDefault();
        dispatch(fetchmoviedetails(data['imdbID'], data['Title'], data['Year']));
    }, [data, dispatch]);
    const detailedMovieResult = useSelector(selectDetailed); // maybe move into useEffect
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
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
                        overflow: "auto",
                    }}
                    variant="outlined"
                >
                    <CardMedia
                        component="img"
                        alt="Movie Poster"
                        height="500"
                        image={detailedMovieResult['Poster'] !== 'N/A' ? detailedMovieResult['Poster'] : noPosterImg}
                    />
                    <CardContent>
                        {detailedMovieResult["Response"] === "False" &&
                            <Typography gutterBottom variant="h5" component="div">
                                ERROR: {detailedMovieResult['Error']} Please check back later.
                            </Typography>
                        }
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
                        <ResultButton data={detailedMovieResult} close={handleClose} />
                        {(typeof (detailedMovieResult['dddWarnings']) !== 'undefined'
                            && detailedMovieResult['dddWarnings'] !== null
                            && detailedMovieResult['dddWarnings'].length !== 0) &&
                            <ExpandMore
                                expand={expanded}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="Content Warnings"
                            >
                                <ExpandMoreIcon />
                            </ExpandMore>
                        }
                    </CardActions>
                    {(typeof (detailedMovieResult['dddWarnings']) !== 'undefined'
                        && detailedMovieResult['dddWarnings'] !== null
                        && detailedMovieResult['dddWarnings'].length !== 0) &&
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <CardContent>
                                <Typography variant="body2" color="text.primary">
                                    <WarningRoundedIcon color="error" />
                                    <b> CONTENT WARNINGS </b>
                                    <WarningRoundedIcon color="error" />
                                </Typography>
                                {typeof (detailedMovieResult['dddURL']) !== 'undefined' &&
                                    <Typography variant="body2" color="text.secondary">
                                        <a href={detailedMovieResult['dddURL']} target="_blank" rel="noreferrer">Click here for more information.</a>
                                    </Typography>
                                }
                                <List>
                                    {(typeof (detailedMovieResult['dddWarnings']) !== 'undefined'
                                        && detailedMovieResult['dddWarnings'] !== null
                                        && detailedMovieResult['dddWarnings'].length !== 0) &&
                                        detailedMovieResult['dddWarnings'].map((warning, index) => (
                                            <ListItem key={index}>
                                                <Typography variant="body2" color="text.secondary">
                                                    {warning.charAt(0).toUpperCase() + warning.slice(1)}
                                                </Typography>
                                            </ListItem>
                                        ))}
                                </List>
                            </CardContent>
                        </Collapse>
                    }
                </Card>
            </Modal>
        </div>
    );
}

export default MovieModal;