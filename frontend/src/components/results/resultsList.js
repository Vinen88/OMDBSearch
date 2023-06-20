/**
 * This component is the grid containing the movie results.
 */
import React from 'react';

import { useSelector } from 'react-redux';
import { selectMovies } from '../../app/movieSlice';

import Result from './Result';

import { Grid } from '@mui/material';
import Container from '@mui/material/Container';


import styles from './ResultsGrid.module.css';

// To make the results better fit the page, allow the results grid container's
// max width to be 90%.

export default function ResultsGrid() {

  // This selector will provide the movie results retrieved from the API
  const movieResults = useSelector(selectMovies);

  return (
    <React.Fragment>
      <Container className={styles.container}>

        {/* Map each movie result into its own Result component in a grid.
            Pass down the index that the movie is located at in the results
            array (used for the remove feature), as well as the movie's
            data (title, year, poster URL) */}
            
        <Grid container spacing={4}>
          {movieResults.map((movie, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Result index={index} data={movie} />
            </Grid>
          ))}
        </Grid>
            
      </Container>
    </React.Fragment>
  );
}
