import React, {useState} from 'react';
import './App.css';
import GameGrid from './components/game';

const numColumns = 50;
const numRows = 50;

function App() {
  const [grid, setGrid] = useState(() => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numColumns), () => 0))
    }
    return rows;
  })
  

  return (
    <div className="App">
      <h1>Conway's Game of Life</h1>
      {grid.map((rows, index) => rows.map((columns, i) =>
        <div
          key={`${index}=${i}`}
          style={{
            width: 30,
            height: 30,
            backgroundColor: grid[index][i] ? 'blue' : undefined,
            border: 'solid 1px black'
          }}/>))}
    </div>
  );
}

export default App;
