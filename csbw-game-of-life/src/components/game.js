import React, {useState, useCallback, useRef} from 'react';
import produce from 'immer';
import { set } from 'immer/dist/internal';

const numColumns = 25;
const numRows = 25;

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

    const [generation, setGeneration] = useState(0)

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
        setGeneration(generation + 1);
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
                        setGeneration(0);
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
                    <div className='gridSquares'
                        key={`${rowI}=${colI}`}
                        onClick={()=> {
                            if (!running) {
                                const newGrid = produce(grid, gCopy => {
                                    gCopy[rowI][colI] = grid[rowI][colI] ? 0: 1;
                                })
                                setGrid(newGrid)
                            }
                        }}
                        style={{
                            width: 20,
                            height: 20,
                            backgroundColor: grid[rowI][colI] ? 'steelblue' : undefined,
                            border: 'solid 1px black'
                        }}
                    />
                )))}
            </div>
            <h3># of Generations: {generation}</h3>
        </div>
    )
}

export default GameGrid;