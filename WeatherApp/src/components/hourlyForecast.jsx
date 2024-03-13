import React, { useState, useEffect } from "react";
import "./hourlyForecast.css";
import { getLocationFromLS } from "../functions/location";

const HourlyForecast = () => {
  const [hourlyForecast, setHourlyForecast] = useState([]);

  useEffect(() => {
    const getHourly = async () => {
      const locationString = getLocationFromLS();
      const location = JSON.parse(locationString); // Parse the string back into an object
      const lat = location.lat;
      const lon = location.lon;
      const key = "28e0bac8d6e2712922db61d4a21b1902";
      const URL = `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&appid=${key}`
      try {
        const response = await fetch(URL);
        if (!response.ok) {
          throw new Error("Failed to fetch hourly forecast data");
        }
        const data = await response.json();
        const currentTime = new Date();
        const next24Hours = new Date(currentTime.getTime() + 24 * 60 * 60 * 1000);
        // console.log(next24Hours)
        const filteredData = data.list.filter((item) => new Date(item.dt_txt) <= next24Hours);
        console.log(filteredData)
        setHourlyForecast(filteredData);
      } catch (error) {
        console.error("Error fetching hourly forecast data:", error);
      }
    };

    getHourly();
  }, [getLocationFromLS]);
  // window.location.reload();

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    const options = { hour: "numeric", minute: "numeric", hour12: true };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };


  return (
    <div className="hourly">
      {hourlyForecast.length > 0 ? (
        hourlyForecast.map((item, index) => (
          <div className="time-block" key={index}>
            <p>{formatTime(item.dt * 1000)}</p>
            <p>{(item.main.temp - 273.15).toFixed(1)}°C</p>
          </div>
        ))
      ) : (
        <p>Loading hourly forecast data...</p>
      )}
    </div>
  );
};

export default HourlyForecast;
