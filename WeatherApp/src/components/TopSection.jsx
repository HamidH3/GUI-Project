import React, { useState, useEffect, useRef } from "react";
import "./TopSection.css";
import { CURRENT_WEATHER_URL, API_KEY } from "../API";
import { getLocationFromLS, setLocationInLS } from "../functions/location";

const WeatherApp = ({ location }) => {
  // State variables to store weather information 
  const [temperature, setTemperature] = useState(null);
  const [weatherDesc, setWeatherDesc] = useState("");
  const [icon, setIcon] = useState(null);

  // Handle default location if none provided 
  if (location == null) {
    location = "Mile End, GB";
  }

  useEffect(() => {
    // Encapsulate weather fetching logic for better organization
    const fetchWeather = async () => {
      if (!location) {
        // Fetch weather for Mile End (default)
        const mileEndLat = 51.5250913;
        const mileEndLon = -0.0350468;
        const weatherURL = `${CURRENT_WEATHER_URL}/weather?lat=${mileEndLat}&lon=${mileEndLon}&appid=${API_KEY}&units=metric`;

        try {
          const response = await fetch(weatherURL);
          const weatherData = await response.json();

          setTemperature(weatherData.main.temp);
          setWeatherDesc(weatherData.weather[0].description);
          setIcon(weatherData.weather[0].icon);

        } 
        catch (error) { 
          console.log("Error fetching Mile End weather:", error);
          setTemperature(null);  // Display error state
        }

      } else {
        // Fetch weather for user-specified location
        const GEO_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${API_KEY}`;

        try {
          const geoResponse = await fetch(GEO_URL);
          const geoData = await geoResponse.json();

          if (geoData.length > 0) {
            const lat = geoData[0].lat;
            const lon = geoData[0].lon;
            const weatherURL = `${CURRENT_WEATHER_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
            setLocationInLS(lat, lon); // Store location for future use 

            const weatherResponse = await fetch(weatherURL);
            const weatherData = await weatherResponse.json();
         
            setTemperature(weatherData.main.temp);
            setWeatherDesc(weatherData.weather[0].description);
            setIcon(weatherData.weather[0].icon);
          }

        } catch (error) {
          console.error("Error fetching weather data:", error);
        } 
      }
    };

    fetchWeather(); // Initiate weather fetching
  }, [location]); // Re-fetch when 'location' prop changes
  return (
    <div className="container">
      <div className="content">
        <div className="location">{location}</div> 
        <div className="temperature">{`${Math.round(temperature)}°C`}</div> 
        <div className="icon">
          <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="Weather Icon"/>
        </div>
        <div className="desc">{weatherDesc}</div>
      </div>
    </div>
  );
};

export default WeatherApp;