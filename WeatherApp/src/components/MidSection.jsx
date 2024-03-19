import React from "react";
import "./MidSection.css";
import HourlyForecast from "./hourlyForecast";

const MidSection = ({location}) => {
  console.log(location);
  return (
    <div className="midSec">
      <p>Hourly Forecast</p>
      <HourlyForecast location = {location}/>
    </div>
  );
};

export default MidSection;
