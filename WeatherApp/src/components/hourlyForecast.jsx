import React, { useState, useEffect } from "react";
import "./hourlyForecast.css";
import { getLocationFromLS, setLocationInLS } from "../functions/location";
import { CURRENT_WEATHER_URL, API_KEY } from "../API";

const HourlyForecast = ({ location }) => {
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [timezone, setTimezone] = useState("");

  useEffect(() => {
    const fetchHourlyForecast = async () => {
      if (!location) {
        // Fetch weather for default location (Mile End)
        const mileEndLat = 51.5250913;
        const mileEndLon = -0.0350468;
        const weatherURL = `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${mileEndLat}&lon=${mileEndLon}&appid=${API_KEY}&units=metric`;

        try {
          const response = await fetch(weatherURL);
          const weatherData = await response.json();

          // Filter for the next 24 hours
          const currentTime = new Date();
          const next24Hours = new Date(
            currentTime.getTime() + 24 * 60 * 60 * 1000
          );

          const filteredData = weatherData.list.filter(
            (item) => new Date(item.dt_txt) <= next24Hours
          );

          setHourlyForecast(filteredData);
          setTimezone(weatherData.city.timezone);
        } catch (error) {
          console.log("Error fetching Mile End weather:", error);
        }
      } else {
        // Fetch weather based on user-provided location
        const GEO_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${API_KEY}`;

        try {
          const geoResponse = await fetch(GEO_URL);
          const geoData = await geoResponse.json();

          if (geoData.length > 0) {
            const lat = geoData[0].lat;
            const lon = geoData[0].lon;
            const weatherURL = `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

            const weatherResponse = await fetch(weatherURL);
            const weatherData = await weatherResponse.json();

            // Filter for next 24 hours
            const currentTime = new Date();
            const next24Hours = new Date(
              currentTime.getTime() + 24 * 60 * 60 * 1000
            );

            const filteredData = weatherData.list.filter(
              (item) => new Date(item.dt_txt) <= next24Hours
            );

            setHourlyForecast(filteredData);
            setTimezone(weatherData.city.timezone);
          }
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      }
    };

    fetchHourlyForecast();
  }, [location]);

  // Function for formatting the time
  const formatTime = (timeString) => {
    const date = new Date(timeString);
    const options = { hour: "numeric", minute: "numeric", hour12: true };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  return (
    <div className="hourly">
      {hourlyForecast.length > 0 ? (
        hourlyForecast.map((weatherData, index) => (
          <div className="time-block" key={index}>
            <p>{formatTime((weatherData.dt + timezone) * 1000)}</p>
            <p>{Math.round(weatherData.main.temp)}°C</p>
            <p className="img">
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                style={{ width: "50px", height: "50px" }}
              ></img>
            </p>
          </div>
        ))
      ) : (
        <p>Loading hourly forecast data...</p>
      )}
    </div>
  );
};

export default HourlyForecast;
