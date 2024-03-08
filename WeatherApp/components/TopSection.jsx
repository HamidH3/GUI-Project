import React from 'react';
import hourlyForecast from "/components/hourlyForecast"


const TopSection = () => {
    return (
      <div className = "TopSec">
        <hourlyForecast />
        {/* Should include iphone components such as time
            and battery symbils, as well as the daily forecast and location */}
        <p>hiiiii</p>
      </div>
    );
    
};


TopSection.propTypes = {

};


export default TopSection;
