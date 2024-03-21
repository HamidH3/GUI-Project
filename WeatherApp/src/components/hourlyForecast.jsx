import React, { useState, useEffect } from "react";
import "./hourlyForecast.css";
import { getLocationFromLS, setLocationInLS } from "../functions/location";
import { CURRENT_WEATHER_URL, API_KEY } from "../API";


const HourlyForecast = ({location}) => {
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [timezone, setTimezone] = useState('');

  useEffect(() => {
      if (!location) {
        const mileEndLat = 51.5215; // Mile End's latitude
        const mileEndLon = -0.0397; // Mile End's longitude
        const weatherURL = `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${mileEndLat}&lon=${mileEndLon}&appid=${API_KEY}&units=metric`;
  
        fetch(weatherURL)
          .then((response) => response.json())
          .then((weatherData) => {
            const currentTime = new Date();
            const next24Hours = new Date(
            currentTime.getTime() + 24 * 60 * 60 * 1000
          );
          const filteredData = weatherData.list.filter(
            (item) => new Date(item.dt_txt) <= next24Hours
          );
          setHourlyForecast(filteredData);
          setTimezone(data.city.timezone);
          })
          .catch(() => {
            console.log("second catch");
          });
      } else {
        // Use GEO API call to get the lat and lon
        // Use lat and lon to get data from openweather using another API call
        const GEO_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${API_KEY}`;
  
        fetch(GEO_URL)
          .then((response) => response.json())
          .then((data) => {
            if (data.length > 0) {
              // Check if data is valid
              const lat = data[0].lat;
              const lon = data[0].lon;
              const weatherURL = `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
              setLocationInLS(lat, lon);
              return fetch(weatherURL);
            }
          })
          .then((response) => response.json())
          .then((weatherData) => {
            console.log(weatherData);
            const currentTime = new Date();
            const next24Hours = new Date(
            currentTime.getTime() + 24 * 60 * 60 * 1000
          );
          const filteredData = weatherData.list.filter(
            (item) => new Date(item.dt_txt) <= next24Hours
          );
          setHourlyForecast(filteredData);
          setTimezone(weatherData.city.timezone);
          })
      }
      console.log(location);
    }, [location]);

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
                style={{ width: "50px", height: "50px"}}
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
