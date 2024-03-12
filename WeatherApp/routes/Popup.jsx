import React, { useRef } from "react";
import PropTypes from "prop-types";
import "./Popup.css";

function getWeather(selectedDaysData) {
  if (selectedDaysData) {
    const lat = 51.9167; // Replace with your desired latitude rn its mile end
    const lon = 0.9; // Replace with your desired longitude rn its mile end
    const key = "557c3851a3d530fbd26a94d193c33403";
    const url = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=7&appid=${key}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data); // handle the API response data here
      })
      .catch((err) => console.log(err));
  }
}

function Popup({ onClose, isVisible, selectedDaysData }) {
  return (
    <div className={`popup ${isVisible ? "visible" : ""}`}>
      <button onClick={onClose} className="close">
        Close
      </button>
      {selectedDaysData && getWeather(selectedDaysData)}
    </div>
  );
}

Popup.propTypes = {
  onClose: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
};

export default Popup;
