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
        </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
