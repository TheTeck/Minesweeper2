import React from 'react';

import './GameSelect.scss';

export default function GameSelect (props) {

    function handleLevelSelect (e) {
        props.updateLevel(e.target.value);
    }

    return (
        <div id="gameselect-container">
            <div className="material-icons icon-medium">psychology</div>
            <select value={props.level} onChange={handleLevelSelect}>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>
        </div>
    )
}