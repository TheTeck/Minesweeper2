import React, { useState, useEffect } from 'react';

import Controls from './Components/Controls/Controls';
import './App.scss';

function App() {

  // level will have the values: 'easy', 'medium' or 'hard'
  const [level, setLevel] = useState('easy')
  
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

  function updateLevel (newLevel) {
    setLevel(newLevel);
  }

  useEffect(() => {
    console.log(level)
  }, [level])

  return (
    <div className="App">
      <Controls level={level} updateLevel={updateLevel} />
    </div>
  );
}

export default App;
