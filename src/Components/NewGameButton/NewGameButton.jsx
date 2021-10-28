import React from 'react';

import './NewGameButton.scss';

export default function NewGameButton (props) {

    function handleRestartClick () {
        props.restartGame();
    }

    return (
        <div id="newgamebutton-container" onClick={handleRestartClick} >
            <div className="material-icons icon-medium">emoji_emotions</div>
        </div>
    )
}