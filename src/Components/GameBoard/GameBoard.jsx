import React, { useState } from 'react';

import Cell from '../Cell/Cell';
import './GameBoard.scss';


class CellData {
    static flaggedCount = 0;
    static exposedCount = 0;

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

export default function GameBoard ({ game, updateFlags }) {

    const [board, setBoard] = useState(generateGameArray(game.x, game.y, game.bombs));
    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const cellSize = 30;

    function handleCellClick(x, y) {
        let index = x + y * game.x;
        let clickedCell = board[index];

        // Can't left click on flagged cells
        if (clickedCell.flagged)
            return;

        // Clicked on a bomb or non-bomb cell
        if (board[x + y * game.x].value === 9) {
            endGame();
        } else {
            exposeMore(x, y);
            setBoard([...board]);
        }

        // Check if player has won
        if (game.x * game.y - game.bombs === CellData.exposedCount) {
            endGame();
            setGameWon(true);
        }
    }

    // Recursively expose all surrounding cells
    function exposeMore (x, y) {
        let cell = board[x + y * game.x];

        if (!cell.exposed)
            cell.expose();

        if (cell.value > 0)
            return

        if (x > 0 && y > 0 && !board[(x-1) + (y-1) * game.x].exposed)
            exposeMore(x-1, y-1);
        if (y > 0 && !board[x + (y-1) * game.x].exposed)
            exposeMore(x, y-1);
        if (x < game.x-1 && y > 0 && !board[(x+1) + (y-1) * game.x].exposed)
            exposeMore(x+1, y-1);
        if (x < game.x-1 && !board[(x+1) + y * game.x].exposed)
            exposeMore(x+1, y);
        if (x < game.x-1 && y < game.y-1 && !board[(x+1) + (y+1) * game.x].exposed)
            exposeMore(x+1, y+1);
        if (y < game.y-1 && !board[x + (y+1) * game.x].exposed)
            exposeMore(x, y+1);
        if (x > 0 && y < game.y-1 && !board[(x-1) + (y+1) * game.x].exposed)
            exposeMore(x-1, y+1);
        if (x > 0 && !board[(x-1) + y * game.x].exposed)
            exposeMore(x-1, y);
    }

    // Helper function to indicate end of game an expose the board
    function endGame () {
        setGameOver(true)
        board.forEach(cell => {
            cell.expose();
        });
        setBoard(board)
    }

    // Right click on cell will turn flag on and off
    function toggleFlag (x, y) {
        if (!(!board[x + y * game.x].flagged && CellData.flaggedCount >= game.bombs)) {
            board[x + y * game.x].flag();
            updateFlags(game.bombs - CellData.flaggedCount)
        }
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
                    width: `${game.x * (cellSize + 2)}px`,
                    height: `${game.y * (cellSize + 2)}px`
                }} 
            >
                {
                    board.map((unit, index) => {
                        return <Cell 
                            key={index} 
                            cell={unit} 
                            size={cellSize} 
                            handleCellClick={handleCellClick}
                            toggleFlag={toggleFlag}    
                        />
                    })
                    
                }
                <h1 className="result-text">{
                    !gameOver ? '' : gameWon ? 'You Won!' : 'You Lost!'
                }</h1>
            </div>
        </div>
    )
}