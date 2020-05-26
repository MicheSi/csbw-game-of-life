import React from 'react';
import './App.css';
import GameGrid from './components/game';


function App() {

  return (
    <div className="App">
      <h1>Conway's Game of Life</h1>
      <GameGrid />
    </div>
  );
}

export default App;
