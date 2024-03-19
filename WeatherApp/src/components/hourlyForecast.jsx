import React, { useState, useEffect } from "react";
import "./hourlyForecast.css";
import { getLocationFromLS, setLocationInLS } from "../functions/location";
import { CURRENT_WEATHER_URL, API_KEY } from "../API";


const HourlyForecast = ({location}) => {
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [timezone, setTimezone] = useState('');

  console.log(location);
  location = String(location);
  const city = location.split(",")[0].trim();
  console.log(city);

  useEffect(() => {
      /* const locationString = getLocationFromLS();
      const location = JSON.parse(locationString); // Parse the string back into an object
      const lat = location.lat;
      const lon = location.lon; */
      
      const key = "28e0bac8d6e2712922db61d4a21b1902";
      //const URL = `https://pro.openweathermap.org/data/2.5/forecast/hourly?q=${city}&appid=${key}&units=metric`;
      
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
            setTemperature(null);
          });
      } else {
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
            //  else {
            //   console.log("second catch");
  
            //   setLocation("Could not find location");
            //   setTemperature(null);
            // }
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
          // .catch(() => {
          //   console.log("third catch");
  
          //   setLocation("Could not find location");
          //   setTemperature(null);
          // });
      }
      console.log(location);
    }, [location]);
      
      /*try {
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
  }, [getLocationFromLS]); */
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
