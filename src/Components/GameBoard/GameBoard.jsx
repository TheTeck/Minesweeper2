import React, { useState } from 'react';

import './GameBoard.scss';


class Cell {
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
            Cell.flaggedCount--;
        } else {
            this.flagged = true;
            Cell.flaggedCount++;
        }
    }

    expose() {
        if (!this.exposed) {
            this.exposed = true;
            Cell.exposedCount++;
        }
    }
}

// props: game = {x, y, bombs}
export default function GameBoard (props) {

    const [board, setBoard] = useState(generateGameArray(props.game.x, props.game.y));

    const cellWidth = 25;

    

    function generateGameArray (x, y) {
        let gameboard = new Array(y);

        for (let j = 0; j < y; j++) {
            gameboard[j] = new Array(x);

            for (let i = 0; i < x; i++) {
                let newCell = new Cell(i, j);
                gameboard[j][i] = newCell;
            }
        }

        // Fill empty nested array with bombs
        gameboard = populateBombs(gameboard, props.game.bombs);

        // Fill cells around bombs with numbers
        gameboard = populateNumbers(gameboard);

        return gameboard;
    }

    // Randomly give cells bombs (if they don't have it already)
    function populateBombs (gameboard, count) {
        while (count) {
            const randX = Math.floor(Math.random() * gameboard[0].length);
            const randY = Math.floor(Math.random() * gameboard.length);

            if (gameboard[randY][randX].value === 0) {
                gameboard[randY][randX].value = 9
                count--
            }
        }

        return gameboard;
    }

    // Populate the cells with numerical values indicating how many bombs are next to it (9=bomb)
    // Each surrounding space also gets out-of-bounds checking 
    function populateNumbers(gameboard) {
        for (let i = 0; i < gameboard.length; i++) {
            for (let j = 0; j < gameboard[0].length; j++) {
                if (gameboard[i][j].value !== 9) {
                    if (j > 0 && i > 0 && gameboard[i-1][j-1].value === 9)
                        gameboard[i][j].value++
                    if(i > 0 && gameboard[i-1][j].value === 9)
                        gameboard[i][j].value++
                    if (i > 0 && j < gameboard[0].length-1 && gameboard[i-1][j+1].value === 9)
                        gameboard[i][j].value++
                    if(j > 0 && gameboard[i][j-1].value === 9)
                        gameboard[i][j].value++
                    if(j < gameboard[0].length-1 && gameboard[i][j+1].value === 9)
                        gameboard[i][j].value++
                    if (j > 0 && i < gameboard.length-1 && gameboard[i+1][j-1].value === 9)
                        gameboard[i][j].value++
                    if(i < gameboard.length-1 && gameboard[i+1][j].value === 9)
                        gameboard[i][j].value++
                    if (j < gameboard[0].length-1 && i < gameboard.length-1 && gameboard[i+1][j+1].value === 9)
                        gameboard[i][j].value++
                }
            }
        }
        return gameboard;
    }

    console.log(board)

    return (
        <div id="gameboard-container">
            <div 
                id="gameboard-area"
                style={{
                    width: `${props.game.x * cellWidth}px`,
                    height: `${props.game.y * cellWidth}px`
                }} 
            >
             {/* Map the array to the screen */}
            </div>
        </div>
    )
}