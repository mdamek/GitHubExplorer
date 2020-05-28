import "react-datepicker/dist/react-datepicker.css";

import React, { useState } from "react";

import Button from "../Buttons/Button.js";
import DatePicker from "react-datepicker";
import Input from "../Basics/Input";
import Label from "../Basics/Label";
import PropTypes from "prop-types";

const Entrance = ({ setResultAvaliable, setGitStatistics }) => {
  const [gitLink, setGitLink] = useState(
    "https://github.com/mdamek/RepositoryAnalyzer.git"
  );
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    const endocedGithubUri = encodeURIComponent(gitLink);
    setGitLink("https://github.com/mdamek/RepositoryAnalyzer.git");
    setStartDate("");
    setEndDate("");
    let validUrl = "api/GitStatistics?gitRepositoryAddress=" + endocedGithubUri;
    validUrl += startDate
      ? "&startDate=" + startDate.toLocaleDateString("en-US")
      : "";
    validUrl += endDate
      ? "&endDate=" + endDate.toLocaleDateString("en-US")
      : "";
    fetch(validUrl)
      .then((response) => response.json())
      .then((json) => {
        setGitStatistics({
          commitsTotalNumber: json.commitsTotalNumber,
          filesCommitedTogetherAverage: json.filesCommitedTogetherAverage,
          filesCommitedTogetherMax: json.filesCommitedTogetherMax,
          sumOfLinesInRepository: json.sumOfLinesInRepository,
          allCommits: json.allCommits,
        });
        setResultAvaliable(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleChange = (event) => {
    setGitLink(event.target.value);
  };
  const cleanDates = () => {
    setStartDate();
    setEndDate();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Label>
          Enter the link to the github repository you want to learn more about
        </Label>
        <Input
          type="text"
          placeholder="Git link"
          onChange={(e) => handleChange(e)}
          value={gitLink}
        />
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
        />
        <Button onClick={cleanDates}>Clean dates</Button>
        <Button type="submit">Explore!</Button>
      </form>
    </>
  );
};

Entrance.propTypes = {
  setResultAvaliable: PropTypes.func,
  setGitStatistics: PropTypes.func,
};

export default Entrance;
