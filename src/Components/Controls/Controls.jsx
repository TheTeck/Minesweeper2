import React from 'react';

import FlagCounter from '../FlagCounter/FlagCounter';
import GameSelect from '../GameSelect/GameSelect';
import NewGameButton from '../NewGameButton/NewGameButton';
import Timer from '../Timer/Timer';
import './Controls.scss';

export default function Controls (props) {
    return (
        <div id="controls-container">
            <div id="controls-cluster">
                <FlagCounter count={props.flags} />
                <GameSelect level={props.level} updateLevel={props.updateLevel} />
                <NewGameButton />
                {/* False for now. should change when game starts */}
                <Timer active={false} /> 
            </div>
        </div>
    )
}