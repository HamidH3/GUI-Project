import React from "react";
import "./MidSection.css";
import HourlyForecast from "./hourlyForecast";


const MidSection = ({location}) => {
  console.log(location);
  return (
    <div className="midSec">
      <h2>Hourly Forecast</h2>
      {/* we are calling hourly forecast component and passing through location prop*/}
      <HourlyForecast location={location} />
    </div>
  );
};

export default MidSection;

