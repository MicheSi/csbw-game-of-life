import React, {useState, useCallback, useRef} from 'react';

const Buttons = props => {
    const [running, setRunning] = useState(false);

    const runningRef = useRef(running);
    runningRef.current = running;

    // const runApp = useCallback(() => {
    //     if (!runningRef.current) {
    //         return;
    //     }

    //     setTimeout(runApp, 1000);
    // }, [])

    return (
        <div className='buttonsDiv'>
            <button
                onClick={()=> {
                    setRunning(!running);
                    if (!running) {
                        runningRef.current = true;
                        props.runApp();
                    }
                }}>
                {running ? 'Stop' : 'Start'}
            </button>

        </div>
    )
}

export default Buttons;