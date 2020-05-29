import "./App.css";

import React, { useState } from "react";

import Entrance from "./Components/Entrance/Entrance.js";
import ReturnButton from "./Components/Buttons/ReturnButton.js";
import Statistics from "./Components/StatisticsView/StatisticsView.js";

const App = () => {
  const [resultAvaliable, setResultAvaliable] = useState(false);
  const [gitStatistics, setGitStatistics] = useState({
    commitsTotalNumber: 0,
    time: 0,
    mergeCommits: 0,
    repositoryTitle: "",
    allCommits: [
      {
        author: "",
        date: "",
        hash: "",
      },
    ],
  });

  const handleReturn = () => {
    setResultAvaliable(false);
  };

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
  );
};

export default App;
