import React from 'react';

import './FlagCounter.scss';

export default function FlagCounter (props) {
    return (
        <div id="flagcounter-container">
            <div className="material-icons icon-medium">flag</div>
            {props.count}
        </div>
    )
}