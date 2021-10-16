import React from 'react';

import FlagCounter from '../FlagCounter/FlagCounter';
import GameSelect from '../GameSelect/GameSelect';
import NewGameButton from '../NewGameButton/NewGameButton';
import './Controls.scss';

export default function Controls (props) {
    return (
        <div id="controls-container">
            <div id="controls-cluster">
                <FlagCounter count={"04"} />
                <GameSelect level={props.level} updateLevel={props.updateLevel} />
                <NewGameButton />
            </div>
        </div>
    )
}