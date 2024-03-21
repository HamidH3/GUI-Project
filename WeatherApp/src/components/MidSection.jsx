import React from "react";
import "./MidSection.css";
import HourlyForecast from "./hourlyForecast";

const MidSection = ({location}) => {
  console.log(location);
  return (
    <div className="midSec">
       {/* Recieves location as a prop and passes it into other components*/}
      <p>Hourly Forecast</p>
      <HourlyForecast location = {location}/>
    </div>
  );
};

export default MidSection;

