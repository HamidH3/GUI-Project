import React from 'react';
import "./BottomSection.css"
import WeatherDetails from "./weatherdetails"
import WeeklyForecast from './weeklyForecast';



const BottomSection = () => {
    return (
      <div className="bottomSec">
        {/* <p>bottom</p> */}
        {/* Should include vertical scroller with extra info */}

        <div className="bottomComponent">
          <WeatherDetails/>
          <p></p>
          <WeeklyForecast/>
        </div>
      </div>
    );
};




export default BottomSection;
