import React from "react";

const blockStyle = {
  border: "2px",
  borderStyle: "solid",
  borderColor: "palevioletred",
  borderRadius: "8px",
  backgroud: "transparent",
  width: "150px"
};

const wrapper = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  margin: "20px"
}

const NumbericalStatistics = ({ labelText, value }) => {
  return (
    <div style={wrapper}>
      <label>{labelText}</label>
      <div style={blockStyle}>{value}</div>
    </div>
  );
};

export default NumbericalStatistics;
