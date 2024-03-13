import React, { useRef } from "react";
import PropTypes from "prop-types";
import "./Popup.css";

function getWeather(selectedDaysData) {
  if (selectedDaysData) {
    const lat = 51.9167; // Replace with your desired latitude rn its mile end
    const lon = 0.9; // Replace with your desired longitude rn its mile end
    const key = "28e0bac8d6e2712922db61d4a21b1902";
    //const url = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=7&appid=${key}`;
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}`
    fetch(url)
      .then((res) => res.json())
      .then((data) => { // INPUT DIFFERENT VALUES HERE
        const weatherData = data.list[0].main;
        //console.log("Temperature:", weatherData.temp-273.15);
        document.getElementById("weather").innerHTML = (weatherData.temp-273.15).toFixed(1);
        document.getElementById("humidity").innerHTML = (weatherData.humidity);
      })
      
      .catch((err) => console.log(err));
      return ( // CHANGE HTML TEXT HERE
        <div>
          Temperature: <span id="weather"></span>
          <br/>
          Humidity: <span id="humidity"></span>
        </div>
      );
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

//new test
export default Popup;
