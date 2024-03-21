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
      {/* Recieves location as a prop and passes it into other components*/}
      

      <div className="bottomComponent">
        <WeeklyForecast location={location} /> 
        <p></p>
        <WeatherDetails location={location} /> 
        <p></p>
        <SpecialFeatureParks location={location} /> 
      </div>
    </div>
  );
};

export default BottomSection;