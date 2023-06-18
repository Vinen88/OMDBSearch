/**
 * This is the search box component.
 */
import React, { useState } from 'react';

import { useDispatch } from 'react-redux';

import { fetchMovies } from '../../app/movieSlice';

import { Container, Typography, Grid, Button, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

import styles from './SearchBox.module.css';

// To match the app's color scheme, use a text field
// with a red outline for the search box (instead of a white outline)
const RedTextField = withStyles({
  root: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#da0000',
      },
      '&:hover fieldset': {
        borderColor: '#da0000',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#da0000',
      },
    },
  },
})(TextField);


export default function SearchBox() {
  const [query, setQuery] = useState(''); // Contains the query typed in the search field
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <div className={styles.containerParent}>
        <Container className={styles.container} maxWidth="md">

          <Typography variant="h3" align="center" color="textPrimary" gutterBottom>
            OMDb Search
          </Typography>

          <Typography variant="h6" align="center" color="textSecondary" paragraph>
            Search for a movie title using the box below. Results from the OMDb
            will be returned.
          </Typography>

          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <RedTextField
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  // For convenience, if the user presses the Enter key inside the search box,
                  // fetch the movie results.
                  if(e.key === 'Enter') {
                    dispatch(fetchMovies(query));  
                  }
                }}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                startIcon={<SearchIcon />}
                onClick={() => dispatch(fetchMovies(query))}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
              
        </Container>
      </div>
    </React.Fragment>
  );
}