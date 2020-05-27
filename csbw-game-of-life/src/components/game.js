import React, {useState, useCallback, useRef} from 'react';
import produce from 'immer';
import Rules from './rules';

let numRows = 25;
let numColumns = 35;

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
    const [generation, setGeneration] = useState(0);
    const [speed, setSpeed] = useState(500);
    const [size, setSize] = useState()

    const runningRef = useRef(running);
    runningRef.current = running;

    const generationRef = useRef(generation);
    generationRef.current = generation;

    const speedRef = useRef(speed);
    speedRef.current = speed;

    const sizeRef = useRef(size);
    sizeRef.current = size;

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
        setTimeout(() => {
            setGeneration(generationRef.current + 1)
            runApp()
        }, speedRef.current)
    }, [])

    const randomGrid = () => {
        const rows = [];
        for (let i = 0; i < numRows; i++) {
          rows.push(Array.from(Array(numColumns), () => Math.random() > 0.8 ? 1 : 0))
        }
        setGrid(rows);
    }

    const changeSize = e => {
        setSize({[e.target.name]: e.target.value})
        console.log(size, e.target.value)
        if (e.target.value === '25x25') {
            numRows = 25;
            numColumns = 25;
        } if (e.target.value === '25x35') {
            numRows = 25;
            numColumns= 35;
        } if (e.target.value === '40x40') {
            numRows = 40;
            numColumns = 40;
        }
    }

    return (
        <div className='mainDiv'>
            <div className='gameDiv'>
                <select id='size' onChange={changeSize} value={size}>
                    <option>Select a grid size</option>
                    <option value='25x25' name='25x25'>25 x 25</option>
                    <option value='25x35' name='25x35'>25 X 35</option>
                    <option value='40x40' name='40x55'>40 X 40</option>
                </select>
                <div
                    className='gameGrid'
                    style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(${numColumns}, 20px)`
                    }}>
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
            </div>
            <div className='mainRight'>
                <Rules/>
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
                    {running ? (
                        <button
                            onClick={() => {
                                setSpeed(1000)
                        }}>
                        Slow
                        </button>
                    ) : (
                        <button>Slow</button>
                    )}
                    {running ? (
                        <button
                            onClick={() => {
                                setSpeed(500)
                        }}>
                        Normal
                        </button>
                    ) : (
                        <button>Normal</button>
                    )}
                    {running ? (
                        <button
                        onClick={() => {
                            setSpeed(100)
                            runApp()
                    }}>
                        Fast
                    </button>
                    ) : (
                        <button>Fast</button>
                    )}
                </div>
                <h3># of Generations: {generation}</h3>
            </div>
        </div>
    )
}

export default GameGrid;