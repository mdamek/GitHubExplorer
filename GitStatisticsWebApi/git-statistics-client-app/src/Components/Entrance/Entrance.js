import "react-datepicker/dist/react-datepicker.css";
import "react-block-ui/style.css";
import "loaders.css/loaders.min.css";

import React, { useState } from "react";

import BlockUi from "react-block-ui";
import Button from "../Buttons/Button.js";
import DatePicker from "react-datepicker";
import Input from "../Basics/Input";
import Label from "../Basics/Label";
import { Loader } from "react-loaders";
import PropTypes from "prop-types";

const GlobalWrapper = {
  position: "fixed",
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  overflow: "auto",
};
const Entrance = ({ setResultAvaliable, setGitStatistics }) => {
  const [gitLink, setGitLink] = useState(
    "https://github.com/mdamek/TampermonkeyScripts.git"
  );
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [blocking, setBlocking] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    toggleBlocking();
    const endocedGithubUri = encodeURIComponent(gitLink);
    setGitLink("https://github.com/mdamek/TampermonkeyScripts.git");
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
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then((json) => {
        setGitStatistics({
          commitsTotalNumber: json.commitsTotalNumber,
          filesCommitedTogetherAverage: json.filesCommitedTogetherAverage,
          filesCommitedTogetherMax: json.filesCommitedTogetherMax,
          sumOfLinesInRepository: json.sumOfLinesInRepository,
          allCommits: json.allCommits,
        });
        toggleBlocking();
        setResultAvaliable(true);
      })
      .catch(error => {
        console.log(error);
        toggleBlocking();
      });
  };

  const handleChange = (event) => {
    setGitLink(event.target.value);
  };
  const cleanDates = () => {
    setStartDate();
    setEndDate();
  };

  const toggleBlocking = () => {
    setBlocking(!blocking);
  };

  return (
    <BlockUi
      tag="div"
      style={GlobalWrapper}
      blocking={blocking}
      loader={<Loader type="line-scale" active color="rgba(255,99,132,1)"/>}
    >
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
    </BlockUi>
  );
};

Entrance.propTypes = {
  setResultAvaliable: PropTypes.func,
  setGitStatistics: PropTypes.func,
};

export default Entrance;
