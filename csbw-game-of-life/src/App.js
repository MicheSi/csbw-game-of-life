import React, {useState} from 'react';
import './App.css';
import GameGrid from './components/game';
import Buttons from './components/buttons';

function App() {

  return (
    <div className="App">
      <h1>Conway's Game of Life</h1>
      <Buttons />
      <GameGrid />
    </div>
  );
}

export default App;
