import React from "react";
import "./MidSection.css";
import HourlyForecast from "./hourlyForecast";

const MidSection = ({location}) => {
  console.log(location);
  return (
    <div className="midSec">
      <h2>Hourly Forecast</h2>
      <HourlyForecast location = {location}/>
    </div>
  );
};

export default MidSection;

