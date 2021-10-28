import React, { useState, useEffect } from 'react';

import Controls from './Components/Controls/Controls';
import GameBoard from './Components/GameBoard/GameBoard';
import './App.scss';

// Object holding the options for board sizes and bomb count
const boardData = {
  easy: {
      x: 10,
      y: 10,
      bombs: 10
  },
  medium: {
      x: 16,
      y: 16,
      bombs: 40
  },
  hard: {
      x: 30,
      y: 16,
      bombs: 99
  }
}

function App() {

  // level will have the values: 'easy', 'medium' or 'hard'
  const [level, setLevel] = useState('easy');
  const [active, setActive] = useState(false);
  const [flags, setFlags] = useState(boardData[level].bombs);
  const [restart, setRestart] = useState(0);

  function updateLevel (newLevel) {
    setLevel(newLevel);
    restartGame();
  }

  function updateFlags (count) {
    setFlags(count);
  }

  function restartGame () {
    setRestart(prev => prev + 1);
  }

  function isActive (newState) {
    setActive(newState);
  }

  return (
    <div className="App">
      <Controls level={level} updateLevel={updateLevel} flags={flags} restartGame={restartGame} active={active} restart={restart} />
      <GameBoard game={boardData[level]} updateFlags={updateFlags} restart={restart} isActive={isActive} />
    </div>
  );
}

export default App;
