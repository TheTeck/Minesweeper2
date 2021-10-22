import React, { useState } from 'react';

import Cell from '../Cell/Cell';
import './GameBoard.scss';


class CellData {
    constructor (x, y) {
        this.x = x;
        this.y = y;
        this.value = 0;
        this.exposed = false;
        this.flagged = false;
    }

    flag() {
        if(this.flagged) {
            this.flagged = false;
            CellData.flaggedCount--;
        } else {
            this.flagged = true;
            CellData.flaggedCount++;
        }
    }

    expose() {
        if (!this.exposed) {
            this.exposed = true;
            CellData.exposedCount++;
        }
    }
}

// props: game = {x, y, bombs}
export default function GameBoard (props) {

    const [board, setBoard] = useState(generateGameArray(props.game.x, props.game.y, props.game.bombs));

    const cellSize = 30;

    function handleCellClick(x, y) {
        //do something here
    }

    // Create array filled with Cells
    function generateGameArray (x, y, bombs) {
        let gameboard = new Array(x * y);

        for (let j = 0; j < y; j++) {
            for (let i = 0; i < x; i++) {
                let newCell = new CellData(i, j);
                gameboard[j * x + i] = newCell;
            }
        }

        // Fill empty nested array with bombs
        gameboard = populateBombs(gameboard, x, y, bombs);

        // Fill cells around bombs with numbers
        gameboard = populateNumbers(gameboard, x, y);

        return gameboard;
    }

    // Randomly give cells bombs (if they don't have it already)
    function populateBombs (gameboard, x, y, bombCount) {
        while (bombCount) {
            const randX = Math.floor(Math.random() * x);
            const randY = Math.floor(Math.random() * y);

            if (gameboard[randY * x + randX].value === 0) {
                gameboard[randY * x + randX].value = 9
                bombCount--
            }
        }

        return gameboard;
    }

    // Populate the cells with numerical values indicating how many bombs are next to it (9=bomb)
    // Each surrounding space also gets out-of-bounds checking 
    function populateNumbers(gameboard, x, y) {
        console.log("in popoulateNumbers")
        for (let i = 0; i < x; i++) {
            for (let j = 0; j < y; j++) {
                if (gameboard[j * x + i].value !== 9) {
                    if (j > 0 && i > 0 && gameboard[(j-1) * x + (i-1)].value === 9)
                        gameboard[j * x + i].value++
                    if(i > 0 && gameboard[j * x + (i-1)].value === 9)
                        gameboard[j * x + i].value++
                    if (i > 0 && j < y-1 && gameboard[(j+1) * x + (i-1)].value === 9)
                        gameboard[j * x + i].value++
                    if(j > 0 && gameboard[(j-1) * x + i].value === 9)
                        gameboard[j * x + i].value++
                    if(j < y-1 && gameboard[(j+1) * x + i].value === 9)
                        gameboard[j * x + i].value++
                    if (j > 0 && i < x-1 && gameboard[(j-1) * x + (i+1)].value === 9)
                        gameboard[j * x + i].value++
                    if(i < x-1 && gameboard[j * x + (i+1)].value === 9)
                        gameboard[j * x + i].value++
                    if (j < y-1 && i < x-1 && gameboard[(j+1) * x + (i+1)].value === 9)
                        gameboard[j * x + i].value++
                }
            }
        }
        return gameboard;
    }

    return (
        <div id="gameboard-container">
            <div 
                id="gameboard-area"
                style={{
                    width: `${props.game.x * (cellSize + 2)}px`,
                    height: `${props.game.y * (cellSize + 2)}px`
                }} 
            >
                {
                    board.map((unit, index) => {
                        return <Cell 
                            key={index} 
                            cell={unit} 
                            size={cellSize} 
                            handleCellClick={handleCellClick}    
                        />
                    })
                }
            </div>
        </div>
    )
}