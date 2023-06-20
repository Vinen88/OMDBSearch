import React from 'react';
import SearchBox from '../components/searchbox/searchbox';
import ResultsList from '../components/results/resultsList';
import ToggleButtons from '../components/ToggleButton/ToggleButton';
import './search.css';

function Search() {
  return (
    <div className="Search">
      <SearchBox />
      <ResultsList />
    </div>
  );
}

export default Search;
