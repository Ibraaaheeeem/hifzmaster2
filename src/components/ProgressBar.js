import React from "react";
import "../styles/progress-bar.css";
import pageOpenings from "../extras/resources"
const ProgressBar = (props) => {
  const { bgcolor, completed, page } = props;
  
  return (
    <div className="progress-container">
      <p direction="rtl" style={{fontSize: 20}}>Page {page + " --- "+ pageOpenings[page - 1].replace("...", "")}</p>
      <div className="progress-filler" style={{width: `${completed}%`, backgroundColor:bgcolor}}>
      <p className="progress-label">{completed}%</p>  
      </div>
    </div>
  );
};

export default ProgressBar;