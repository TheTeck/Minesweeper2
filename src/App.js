import React, { useState, useEffect } from 'react';

import Controls from './Components/Controls/Controls';
import './App.scss';

function App() {

  const [level, setLevel] = useState('easy')

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
