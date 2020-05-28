import React from 'react';

import GameGrid from './components/game';
import About from './components/about';
import Footer from './components/footer';

import './App.css';

function App() {

  return (
    <div className="App">
      <h1>Conway's Game of Life</h1>
      <About />
      <GameGrid />
      <Footer />
    </div>
  );
}

export default App;
