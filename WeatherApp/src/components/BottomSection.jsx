import React from "react";
import "./BottomSection.css";
import WeatherDetails from "./weatherdetails";
import WeeklyForecast from "./weeklyForecast";
import SpecialFeatureParks from "./specialFeatureParks";

const BottomSection = () => {
  return (
    <div className="bottomSec">
      {/* <p>bottom</p> */}
      {/* Should include vertical scroller with extra info */}

      <div className="bottomComponent">
        <WeeklyForecast />
        <p></p>
        <WeatherDetails />
        <p></p>
        {/* <SpecialFeatureParks /> */}
      </div>
    </div>
  );
};

export default BottomSection;
