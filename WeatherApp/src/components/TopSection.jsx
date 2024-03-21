import React, { useState, useEffect, useRef } from "react";
import "./TopSection.css";
import { CURRENT_WEATHER_URL, API_KEY } from "../API";
import { getLocationFromLS, setLocationInLS } from "../functions/location";

const WeatherApp = ({location}) => {
  const [temperature, setTemperature] = useState(null);
  const [weatherDesc, setWeatherDesc] = useState("");
  const [icon, setIcon] = useState(null);

  if (location == null) {
    location = "Mile End, GB"
  }

  useEffect(() => {
    // Set location to Mile End as default
    if (!location) {
      const mileEndLat = 51.5215; // Mile End's latitude
      const mileEndLon = -0.0397; // Mile End's longitude
      const weatherURL = `${CURRENT_WEATHER_URL}/weather?lat=${mileEndLat}&lon=${mileEndLon}&appid=${API_KEY}&units=metric`;

      fetch(weatherURL)
        .then((response) => response.json())
        .then((weatherData) => {
          setTemperature(weatherData.main.temp);
          setWeatherDesc(weatherData.weather[0].description);
          setIcon(weatherData.weather[0].icon);
        })
        .catch(() => {
          console.log("second catch");
          setTemperature(null);
        });
    } else {
      // Use GEO API call to get the lat and lon
      // Use lat and lon to get data from openweather using an API call
      const GEO_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${API_KEY}`;

      fetch(GEO_URL)
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            // Check if data is valid
            const lat = data[0].lat;
            const lon = data[0].lon;
            const weatherURL = `${CURRENT_WEATHER_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
            setLocationInLS(lat, lon);
            return fetch(weatherURL);
          }
        })
        .then((response) => response.json())
        .then((weatherData) => {
          console.log(weatherData);
          // Enhanced display
          // Put the data provided by the API into variables
          setTemperature(weatherData.main.temp);
          setWeatherDesc(weatherData.weather[0].description);
          setIcon(weatherData.weather[0].icon);
        })
    }
    console.log(location);
  }, [location]);

  return (
    <div className="container">
      {" "}
      {/* Main container for layout */}
      <div className="content">
        <div className="location">{location}</div>
        <div className="temperature">{`${Math.round(temperature)}°C`}</div>
        <div className="icon">
          <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} />
        </div>
        <div className="desc">{weatherDesc}</div>
      </div>
    </div>
  );
};

export default WeatherApp;
