import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Search from './containers/search';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={ <Search/> } />
          {/* more routes can be added if needed was planning on needing more but went a different direction
          left it here because it could be useful for feature additions later. */}
        </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
