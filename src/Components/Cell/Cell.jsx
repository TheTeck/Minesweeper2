import React, { useState } from 'react';

import './Cell.scss';

export default function Cell (props) {

    const [exploded, setExploded] = useState(false);

    function handleLeftClick () {
        if (props.cell.value === 9)
            setExploded(true);

        props.handleCellClick(props.cell.x, props.cell.y);
    }

    function handleRightClick (e) {
        e.preventDefault();
        props.toggleFlag(props.cell.x, props.cell.y);
    }

    return (
        <div 
            className="cell-container"
            style={{
                width: `${props.size}px`,
                height: `${props.size}px`
            }}
        >
            {
                !props.cell.exposed ? (props.cell.flagged ? <div onClick={handleLeftClick} onContextMenu={handleRightClick} className="unexposed-cell material-icons icon-tiny">flag</div>
                : <div onClick={handleLeftClick} onContextMenu={handleRightClick} className="unexposed-cell"></div>)
                : props.cell.value === 9 ? (exploded ? <div className="material-icons icon-tiny exploded">wb_sunny</div>
                : <div className="material-icons icon-tiny">wb_sunny</div>)
                : <div className={`cell${props.cell.value}`}> {props.cell.value ? props.cell.value : ''}</div>
            }
        </div>
    )
}