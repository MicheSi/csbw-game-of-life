import React from 'react';

const Rules = () => {
    return (
        <div className='rules'>
            <h2>Rules</h2>
            <ol>
                <li>Any live cell with 2 or 3 live neighbors survives.</li>
                <li>Any dead cell with 3 live neighbors becomes a live cell.</li>
                <li>All other cells die in the next generation. All dead cells remain dead.</li>
            </ol>

        </div>
    )
}

export default Rules;