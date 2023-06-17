import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import SearchBox from './components/searchbox/searchbox';
import ResultsList from './components/results/resultsList';
import './App.css';

function App() {
  return (
    <div className="App">
      <SearchBox />
      <ResultsList />
    </div>
  );
}

export default App;
