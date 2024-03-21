import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./Popup.css";
import { API_KEY } from "../src/API";
import { getLocationFromLS } from "../src/functions/location";

function getWeather(selectedDaysData, selectedIndex) {

  // Return early if selectedDaysData is falsy
  if (!selectedDaysData) {
    return null;
  }

  //retrieve location lat and lon from local storage
  const locationString = getLocationFromLS();
  const location = JSON.parse(locationString); // Parse the string back into an object
  const lat = location.lat;
  const lon = location.lon;


  //instantiate useState variables
  const [temp, setTemp] = useState('');
  const [rain, setRain] = useState('');
  const [humidity, setHumidity] = useState('');
  const [tempMin, setTempMin] = useState('');
  const [tempMax, setTempMax] = useState('');
  const [pressure, setPressure] = useState('');
  const [wind, setWind] = useState('');
  const [weather, setWeather] = useState('');
  const [icon, setIcon] = useState('');

  const url = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  //this fetches the response from the api 'url', then sets its data to corresponding use states
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const weatherData = data.list[selectedIndex];
      setTemp((weatherData.temp.day).toFixed(0))
      setRain((weatherData.rain))
      setHumidity(weatherData.humidity)
      setTempMin((weatherData.temp.min).toFixed(0))
      setTempMax((weatherData.temp.max).toFixed(0))
      setPressure(weatherData.pressure)
      setWind((weatherData.speed).toFixed(0))
      setWeather(weatherData.weather[0].description)
      setIcon(weatherData.weather[0].icon)
    })
    .catch((err) => console.log(err));
//formats the date to show week days instead of numeric values
  var currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + selectedIndex);

  const today = new Date();
  const dayToday =
    currentDate.toDateString() === today.toDateString();

  const dayLabel = dayToday
    ? "Today"
    : currentDate.toLocaleDateString("en-US", { weekday: "long" });

    //this return statement outputs the information onto the screen
  return (
    <div>
      <h2>{dayLabel}</h2>

      <img className= "weatherIcon"
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
      
      ></img>
      <h4>{weather}</h4>
      <div className="weatherInfo">
        <div className="infoBox">
          <p>
            Temperature: <br></br><span>{temp}</span>°C
          </p>
        </div>
        <div className="infoBox">
          <p>
            Humidity: <br></br><span>{humidity}</span>%
          </p>
        </div>
        <div className="infoBox">
          <p>
            Min Temperature: <br></br><span>{tempMin}</span>°C
          </p>
        </div>
        <div className="infoBox">
          <p>
            Max Temperature: <br></br><span>{tempMax}</span>°C
          </p>
        </div>
        <div className="infoBox">
          <p>
            Average Pressure: <br></br><span>{pressure}</span> mbar
          </p>
        </div>
        <div className="infoBox">
          <p>
            Wind: <br></br><span>{wind}</span> mph
          </p>
        </div>
      </div>
      {/* This section is a list of if statements that provide the stakeholder with
      relevant helpful information regarding the weather and prompts them to dress 
      accordingly */}
      <h3>Need help?</h3>
      {temp > 20 && (
        <p>
          It is quite warm today.<br></br>Maybe wear something lighter coloured
          and loose.
        </p>
      )}
      {temp < 10 && (
        <p>
          It is quite chilly today.<br></br>Maybe wear something that will keep
          you warm.
        </p>
      )}
      {temp <= 20 && temp >= 10 && (
        <p>
          It is a perfect day today.<br></br> Wear what you feel is suitable for
          your activities
        </p>
      )}

      {rain > 5 && (
        <p>
          It might rain quite a bit today.<br></br>Consider carrying an umbrella
          or raincoat.
        </p>
      )}
      {rain > 0 && rain <= 5 && (
        <p>
          There's a chance of some showers.<br></br>A light jacket might be a
          good idea.
        </p>
      )}
      {rain == 0 && <p>It looks rain free today!</p>}
    </div>
  );
}

//here we allow the user to close the button, setting the visibility to false.
function Popup({ onClose, isVisible, selectedDaysData, selectedIndex }) {
  return (
    <div className={`popup ${isVisible ? "visible" : ""}`}>
      <button onClick={onClose} className="close">
        Close
      </button>
      {selectedDaysData && getWeather(selectedDaysData, selectedIndex)}

    </div>
  );
}

Popup.propTypes = {
  onClose: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
};

//export pop up so it can be called in weeklyForecast.jsx
export default Popup;