import React from "react";
import "./MidSection.css";
import HourlyForecast from "/components/hourlyForecast";

const MidSection = () => {
  return (
    <div className="MidSec">
      {/* should include the middle horizntal scroller for hourly forecast */}
      <div className="hourlycontainer">
        <HourlyForecast />
      </div>
    </div>
  );
};

MidSection.propTypes = {};

export default MidSection;
