import React from "react";
import "./BottomSection.css";
import WeatherDetails from "./weatherdetails";
import WeeklyForecast from "./weeklyForecast";
import SpecialFeatureParks from "./specialFeatureParks";

const BottomSection = ({location}) => {
  console.log(location);
  
  return (
    <div className="bottomSec">
      {/* <p>bottom</p> */}
      {/* Should include vertical scroller with extra info */}
      

      <div className="bottomComponent">
        <WeeklyForecast location = {location}/>
        <p></p>
        <WeatherDetails location = {location}/>
        <p></p>
        <SpecialFeatureParks location = {location}/>
      </div>
    </div>
  );
};

export default BottomSection;
