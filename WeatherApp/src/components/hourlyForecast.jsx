import React, { useState, useEffect } from "react";
import "./hourlyForecast.css";
import { getLocationFromLS } from "../functions/location";
import {API_KEY} from "../API"

const HourlyForecast = () => {
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [timezone, setTimezone] = useState('');
  const[geoInfo, setGeoInfo] = useState();

  useEffect(() => {
    
    const getHourly = async () => {
      const locationString = getLocationFromLS();
     const GEO_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${locationString}&limit=1&appid=${API_KEY}`;

    //  fetch(GEO_URL)
    //    .then((res) => res.json())
    //    .then((data) => {
    //      data = data[0];

    //      setGeoInfo(data);
    //    });
    //     const lat = geoInfo.lat;
    //     const lon = geoInfo.lon;

     
    //   const URL = `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
      

      
      try {
           const result = await fetch(GEO_URL);

             if (!result.ok) {
               throw new Error("Failed to fetch location data");
             }
             const info = await result.json();
             const lat = info[0].lat;
             const lon = info[0].lon;

           const URL = `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
      

        const response = await fetch(URL);
        if (!response.ok) {
          throw new Error("Failed to fetch hourly forecast data");
        }
        const data = await response.json();
        
        const currentTime = new Date();
        const next24Hours = new Date(
          currentTime.getTime() + 24 * 60 * 60 * 1000
        );
        const filteredData = data.list.filter(
          (item) => new Date(item.dt_txt) <= next24Hours
        );
        setHourlyForecast(filteredData);
        setTimezone(data.city.timezone);
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
