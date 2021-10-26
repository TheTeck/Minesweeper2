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
  const [flags, setFlags] = useState(boardData[level].bombs)

  function updateLevel (newLevel) {
    setLevel(newLevel);
  }

  function updateFlags (count) {
    setFlags(count);
  }

  useEffect(() => {
    console.log(level)
  }, [level])

  return (
    <div className="App">
      <Controls level={level} updateLevel={updateLevel} flags={flags} />
      <GameBoard game={boardData[level]} updateFlags={updateFlags} />
    </div>
  );
}

export default App;
