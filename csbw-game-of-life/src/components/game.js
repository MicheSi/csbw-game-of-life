import React, {useState, useCallback, useRef} from 'react';
import produce from 'immer';

const numColumns = 40;
const numRows = 40;

const operations = [
    [0, 1],
    [0, -1],
    [1, -1],
    [-1, 1],
    [-1, -1],
    [1, 1],
    [1, 0],
    [-1, 0]
]

const resetGrid = () => {
    const rows = [];
        for (let i = 0; i < numRows; i++) {
          rows.push(Array.from(Array(numColumns), () => 0))
        }
        return rows;
}

const GameGrid = props => {
    const [grid, setGrid] = useState(() => {
        return resetGrid();
      })

    const [running, setRunning] = useState(false);

    const runningRef = useRef(running);
    runningRef.current = running;

    const runApp = useCallback(() => {
        if (!runningRef.current) {
            return;
        }
        setGrid(g => {
            return produce(g, gridCopy => {
                for (let i = 0; i < numRows; i++){
                    for (let j = 0; j < numColumns; j++) {
                        let neighbors = 0;
                        operations.forEach(([x, y]) => {
                            const newI = i + x;
                            const newJ = j + y;
                            if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numColumns) {
                                neighbors += g[newI][newJ];
                            }
                        })
                        if (neighbors < 2 || neighbors > 3) {
                            gridCopy[i][j] = 0;
                        } else if (g[i][j] === 0 && neighbors === 3) {
                            gridCopy[i][j] = 1;
                        }
                    }
                }
            })
        })
        setTimeout(runApp, 500);
    }, [])

    const randomGrid = () => {
        const rows = [];
        for (let i = 0; i < numRows; i++) {
          rows.push(Array.from(Array(numColumns), () => Math.random() > 0.8 ? 1 : 0))
        }
        return rows;
    }

    return (
        <div className='gameDiv'>
            <div className='buttonsDiv'>
                <button
                    onClick={()=> {
                        setRunning(!running);
                        if (!running) {
                            runningRef.current = true;
                            runApp();
                        }
                    }}>
                    {running ? 'Stop' : 'Start'}
                </button>
                <button
                    onClick={() => {
                        setGrid(resetGrid());
                    }}>
                    Clear
                </button>
                <button
                    onClick={() => {
                        setGrid(randomGrid)
                }}>
                    Random
                </button>
            </div>
            <div className='gameGrid'>
                {grid.map((rows, rowI) => rows.map((columns, colI) => (
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
                )))}
            </div>
        </div>
    )
}

export default GameGrid;