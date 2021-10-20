import React from 'react';

import './Cell.scss';

export default function Cell (props) {
    return (
        <div 
            id="cell-container"
            style={{
                width: `${props.size}px`,
                height: `${props.size}px`
            }}
        >
            <div className="cell-data">{props.cell.value}</div>
        </div>
    )
}