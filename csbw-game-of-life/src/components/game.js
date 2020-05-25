import React, {useState} from 'react';
import produce from 'immer';

const numColumns = 50;
const numRows = 50;

const GameGrid = props => {
    const [grid, setGrid] = useState(() => {
        const rows = [];
        for (let i = 0; i < numRows; i++) {
          rows.push(Array.from(Array(numColumns), () => 0))
        }
        return rows;
      })

    return (
        <div className='gameGrid'
            style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${numColumns}, 20px)`
            }}>
            {grid.map((rows, rowI) => rows.map((columns, colI) =>
            <div
                key={`${rowI}=${colI}`}
                onClick={()=> {
                    const newGrid = produce(grid, gCopy => {
                        gCopy[rowI][colI] = grid[rowI][colI] ? 0: 1;
                    })
                    setGrid(newGrid)
                }}
                style={{
                    width: 20,
                    height: 20,
                    backgroundColor: grid[rowI][colI] ? 'blue' : undefined,
                    border: 'solid 1px black'
                }}
            />
            ))}
        </div>
    )
}

export default GameGrid;