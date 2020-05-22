import React, { useState } from 'react'
import './App.css'
import Entrance from './Components/Entrance/Entrance.js'
import Statistics from './Components/StatisticsView/StatisticsView.js'
import ReturnButton from './Components/Buttons/ReturnButton.js'
const App = () => {
  const [resultAvaliable, setResultAvaliable] = useState(false)
  const [gitStatistics, setGitStatistics] = useState({
    commitsTotalNumber: 0,
    filesCommitedTogetherAverage: 0,
    filesCommitedTogetherMax: 0,
    sumOfLinesInRepository: 0
  })

  const handleReturn = () => {
    setResultAvaliable(false)
  }

  return (
    <div className="App">
      <header className="App-header">
        {resultAvaliable ? (
          <Statistics gitStatistics={gitStatistics} />
        ) : (
          <Entrance
            setResultAvaliable={setResultAvaliable}
            setGitStatistics={setGitStatistics}
          />
        )}
        {resultAvaliable ? (
          <ReturnButton onClick={handleReturn}>Return</ReturnButton>
        ) : null}
      </header>
    </div>
  )
}

export default App
