import React from 'react';

import GameGrid from './components/game';
import Rules from './components/rules';

import './App.css';


function App() {

  return (
    <div className="App">
      <h1>Conway's Game of Life</h1>
      <GameGrid />
      <Rules />
    </div>
  );
}

export default App;
