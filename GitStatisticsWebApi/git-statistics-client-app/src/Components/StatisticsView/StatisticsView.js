import { Bar, Line } from "react-chartjs-2";

import NumbericalStatistics from "../NumericalStatistics/NumericalStatistics.js";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
`;

const Statistics = ({ gitStatistics }) => {
  const {
    commitsTotalNumber,
    allCommits,
    time,
    mergeCommits,
    repositoryTitle,
  } = gitStatistics;

  const createDataForTimeDistributionTime = () => {
    let hours = new Array(24).fill(0);
    for (let step = 0; step < allCommits.length; step++) {
      hours[new Date(allCommits[step].date).getHours()] += 1;
    }
    const data = {
      labels: [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
      ],
      datasets: [
        {
          label: "Commits per hour of day",
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: hours,
        },
      ],
    };
    return data;
  };

  const createDataForAverageDailyCommits = () => {
    var dict = {};
    for (let step = 0; step < allCommits.length; step++) {
      let actulaDate = new Date(allCommits[step].date);
      let toReadFormat =
        actulaDate.getDay().toString() +
        "." +
        actulaDate.getMonth().toString() +
        "." +
        actulaDate.getFullYear().toString();
      dict[toReadFormat] ? (dict[toReadFormat] += 1) : (dict[toReadFormat] = 1);
    }
    const data = {
      labels: Object.keys(dict),
      datasets: [
        {
          label: "Commits per days",
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: Object.values(dict),
        },
      ],
    };
    return data;
  };

  const createDataForCommitsAuthor = () => {
    var dict = {};
    for (let step = 0; step < allCommits.length; step++) {
      let author = allCommits[step].author;
      dict[author] ? (dict[author] += 1) : (dict[author] = 1);
    }
    const data = {
      labels: Object.keys(dict),
      datasets: [
        {
          label: "Commits per author",
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: Object.values(dict),
        },
      ],
    };
    return data;
  };

  const createCommitsOnWeekDay = () => {
    let days = new Array(7).fill(0);
    for (let step = 0; step < allCommits.length; step++) {
      let day = new Date(allCommits[step].date).getDay();
      days[day] += 1;
    }

    const data = {
      labels: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      datasets: [
        {
          label: "Commits per week day",
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: days,
        },
      ],
    };
    return data;
  };

  const getContributorsNumber = () => {
    var dict = {};
    for (let step = 0; step < allCommits.length; step++) {
      let author = allCommits[step].author;
      dict[author] ? (dict[author] += 1) : (dict[author] = 1);
    }
    return Object.keys(dict).length;
  };

  return (
    <>
      <Wrapper>
        <NumbericalStatistics
          labelText="Commits"
          value={commitsTotalNumber}
        />
        <NumbericalStatistics
          labelText="Contributors"
          value={getContributorsNumber()}
        />
        <NumbericalStatistics labelText="Merge commits" value={mergeCommits} />
        <NumbericalStatistics labelText="Computation time" value={time + "s"} />
      </Wrapper>
      <div style={{ margin: "25px" }}>{repositoryTitle}</div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Bar
            data={createDataForTimeDistributionTime}
            width={900}
            height={350}
            style={{ margin: "10px" }}
            options={{
              responsive: false,
              maintainAspectRatio: true,
              legend: {
                labels: {
                  fontColor: "white",
                  fontSize: 18
                },
              },
              scales: {
                yAxes: [
                  {
                    ticks: {
                      fontColor: "white",
                      fontSize: 10
                    },
                  },
                ],
                xAxes: [
                  {
                    ticks: {
                      fontColor: "white",
                      fontSize: 12
                    },
                  },
                ],
              },
            }}
          />
          <Line
            data={createDataForAverageDailyCommits}
            width={900}
            height={350}
            options={{
              responsive: false,
              maintainAspectRatio: true,
              legend: {
                labels: {
                  fontColor: "white",
                  fontSize: 18,
                },
              },
              scales: {
                yAxes: [
                  {
                    ticks: {
                      fontColor: "white",
                      fontSize: 10
                    },
                  },
                ],
                xAxes: [
                  {
                    ticks: {
                      fontColor: "white",
                      fontSize: 12
                    },
                  },
                ],
              },
            }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Bar
            data={createCommitsOnWeekDay}
            width={900}
            height={350}
            options={{
              responsive: false,
              maintainAspectRatio: true,
              legend: {
                labels: {
                  fontColor: "white",
                  fontSize: 18,
                },
              },
              scales: {
                yAxes: [
                  {
                    ticks: {
                      fontColor: "white",
                      fontSize: 10
                    },
                  },
                ],
                xAxes: [
                  {
                    ticks: {
                      fontColor: "white",
                      fontSize: 12
                    },
                  },
                ],
              },
            }}
          />
          <Bar
            data={createDataForCommitsAuthor}
            width={900}
            height={350}
            options={{
              responsive: false,
              maintainAspectRatio: true,
              legend: {
                labels: {
                  fontColor: "white",
                  fontSize: 18,
                },
              },
              scales: {
                yAxes: [
                  {
                    ticks: {
                      fontColor: "white",
                      fontSize: 10
                    },
                  },
                ],
                xAxes: [
                  {
                    ticks: {
                      fontColor: "white",
                      fontSize: 12
                    },
                  },
                ],
              },
            }}
          />
        </div>
      </div>
    </>
  );
};

Statistics.propTypes = {
  gitStatistics: {
    commitsTotalNumber: PropTypes.number,
    time: PropTypes.number,
    mergeCommits: PropTypes.number,
    repositoryTitle: PropTypes.string,
    allCommits: PropTypes.arrayOf(
      PropTypes.shape({
        author: PropTypes.string,
        date: PropTypes.date,
        hash: PropTypes.string,
      })
    ),
  },
};

export default Statistics;
