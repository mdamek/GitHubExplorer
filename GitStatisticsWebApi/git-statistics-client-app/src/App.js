import React, { useState } from 'react';
import './App.css';
import WaitingForInput from './WaitingForInput.js';
import ReadyStatistics from './ReadyStatistics.js';
import ReturnButton from './ReturnButton.js'
const App = () => {

  const [resultAvaliable, setResultAvaliable] = useState(false);
  const [gitStatistics, setGitStatistics] = useState({
    commitsTotalNumber:0,
    filesCommitedTogetherAverage:0,
    filesCommitedTogetherMax:0,
    sumOfLinesInRepository:0
  });

  const handleReturn = () => {
    setResultAvaliable(false);
  }

  return (
    <div className="App">
      <header className="App-header">
        {resultAvaliable ? <ReadyStatistics gitStatistics={gitStatistics}/> : <WaitingForInput setResultAvaliable={setResultAvaliable} setGitStatistics={setGitStatistics}/>}
      <ReturnButton onClick={handleReturn}>Return</ReturnButton>
      </header>
    </div>
  );
}

export default App;
