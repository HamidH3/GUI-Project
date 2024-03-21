import React from "react";
import "./BottomSection.css";
import WeatherDetails from "./weatherdetails";
import WeeklyForecast from "./weeklyForecast";
import SpecialFeatureParks from "./specialFeatureParks";

const BottomSection = ({ location }) => {
  console.log(location); // Logs the current location to the console (likely for debugging)

  return (
    <div className="bottomSec">
      {/* Main container for all bottom section content */}
      <div className="bottomComponent">
        <WeeklyForecast location={location} /> 
        {/* Passes the 'location' prop to the WeeklyForecast component */}
        <p></p>
        <WeatherDetails location={location} /> 
        {/* Passes the 'location' prop to the WeatherDetails component */}
        <p></p>
        <SpecialFeatureParks location={location} /> 
        {/* Passes the 'location' prop to the SpecialFeatureParks component */}
      </div>
    </div>
  );
};

export default BottomSection;