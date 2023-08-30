/**
 * This is the search box component.
 */
import React, { useState } from 'react';

import { useDispatch } from 'react-redux';

import { fetchMovies } from '../../app/movieSlice';

import { Container, Typography, Grid, Button, TextField } from '@mui/material';

import ToggleButton from '../ToggleButton/ToggleButton';


import SearchIcon from '@mui/icons-material/Search';

import styles from './SearchBox.module.css';

// To match the app's color scheme, use a text field
// with a red outline for the search box (instead of a white outline)


export default function SearchBox() {
  const [query, setQuery] = useState(''); // Contains the query typed in the search field
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <div className={styles.containerParent}>
        <Container className={styles.container} maxWidth="md">

          <Typography variant="h3" align="center" style={{ color: '#603840' }} color="textPrimary" gutterBottom>
            OMDb Search
          </Typography>

          <Typography variant="h6" align="center" style={{ color: '#603840' }} paragraph>
            Search for a movie title using the box below. Results from the OMDb
            will be returned.
          </Typography>

          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <TextField
                placeholder="Search for a movie"
                fontcolor="#603840"
                value={query}
                style={{ backgroundColor: 'white', color: '#603840', boarderColor: '#9f94a0' }}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  // For convenience, if the user presses the Enter key inside the search box,
                  // fetch the movie results.
                  if (e.key === 'Enter') {
                    dispatch(fetchMovies(query));
                  }
                }}
                color="secondary"
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                style={{ backgroundColor: '#bd8990', color: '#603840' }}
                starticon={<SearchIcon />}
                onClick={() => dispatch(fetchMovies(query))}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
          <ToggleButton data={query} />
        </Container>
      </div>
    </React.Fragment>
  );
}