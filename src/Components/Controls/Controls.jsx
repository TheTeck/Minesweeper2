import React from 'react';

import FlagCounter from '../FlagCounter/FlagCounter';
import './Controls.scss';

export default function Controls (props) {
    return (
        <div id="controls-container">
            <div id="controls-cluster">
                <FlagCounter count={"04"} />
            </div>
        </div>
    )
}