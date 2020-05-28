import React from 'react';
import music from '../FortuneDays.mp3';

const Music = () => {

    return (
        <div className='musicControls'>
            <audio
                id='audio'
                src={music}
                controls
                loop
            />
        </div>
    )
}

export default Music;