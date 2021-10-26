import React from 'react';

import './Cell.scss';

export default function Cell (props) {

    function handleLeftClick () {
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
                !props.cell.exposed ? (props.cell.flagged ? <div onClick={handleLeftClick} onContextMenu={handleRightClick} className="unexposed-cell material-icons icon-tiny" style={{ backgroundColor: 'maroon' }}>flag</div>
                : <div onClick={handleLeftClick} onContextMenu={handleRightClick} className="unexposed-cell" style={{ backgroundColor: 'maroon' }}></div>)
                : props.cell.value === 9 ? <div className="material-icons icon-tiny">wb_sunny</div>
                : <div className={`cell${props.cell.value}`}> {props.cell.value ? props.cell.value : ''}</div>
            }
        </div>
    )
}