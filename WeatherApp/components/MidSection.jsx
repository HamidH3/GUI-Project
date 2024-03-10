import React from "react";
import "./MidSection.css";
import HourlyForecast from "./hourlyForecast";
 
const MidSection = () => {
  return (
    <div className="midSec">
      <p>Hourly Forecast</p>
      <HourlyForecast />
    </div>
  );
};

export default MidSection;
