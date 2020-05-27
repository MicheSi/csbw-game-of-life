import React from 'react';

import GameGrid from './components/game';
import Rules from './components/rules';

import './App.css';
import About from './components/about';


function App() {

  return (
    <div className="App">
      <h1>Conway's Game of Life</h1>
      <About />
      <GameGrid />
      <Rules />
    </div>
  );
}

export default App;
