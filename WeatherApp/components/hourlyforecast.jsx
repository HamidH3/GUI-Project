// import React from "react";
// import "./hourlyForecast.css"

// const HourlyForecast = () => {
//   return (
//     <div className = "hourly">
//       <p>hourly</p>
//     </div>
//   );
// };

// HourlyForecast.propTypes = {};

// export default HourlyForecast;

import React from "react";
import "./hourlyForecast.css";

const HourlyForecast = () => {
  const renderTimeBlocks = () => {
    const times = [];
    for (let hour = 6; hour <= 22; hour++) {
      times.push(
        <div key={hour} className="time-block">
          {hour}:00
        </div>
      );
    }
    return times;
  };

  return <div className="hourly">{renderTimeBlocks()}</div>;
};

export default HourlyForecast;
