import React, { useState } from 'react';
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
            <p>"Fortune Days" by The Glitch Mob</p>
        </div>
    )
}

export default Music;