import React, { useState, useEffect } from "react";
import "./weatherdetails.css";
import { getLocationFromLS, setLocationInLS } from "../functions/location";
import { API_KEY } from "../API";

const Weatherdetails = ( {location} ) => {
  const [temp, setTemp] = useState(''); 
  const [humidity, setHumidity] = useState('');
  const [tempMin, setTempMin] = useState('');
  const [tempMax, setTempMax] = useState('');
  const [pressure, setPressure] = useState('');
  const [wind, setWind] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!location) {
      const mileEndLat = 51.5215; // Mile End's latitude
      const mileEndLon = -0.0397; // Mile End's longitude
      const weatherURL = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${mileEndLat}&lon=${mileEndLon}&appid=${API_KEY}&units=metric`;

      fetch(weatherURL)
        .then((response) => response.json())
        .then((weatherData) => {
          setTemp((weatherData.list[0].temp.day))
          setHumidity(weatherData.list[0].humidity)
          setTempMin((weatherData.list[0].temp.min))
          setTempMax((weatherData.list[0].temp.max))
          setPressure(weatherData.list[0].pressure)
          setWind((weatherData.list[0].speed))
          setLoading(false);
        })
        .catch(() => {
          console.log("second catch");
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
            const weatherURL = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
            setLocationInLS(lat, lon);
            return fetch(weatherURL);
          }
        })
        .then((response) => response.json())
        .then((weatherData) => {
          console.log(weatherData);
          // Enhanced display
          setTemp((weatherData.list[0].temp.day))
          setHumidity(weatherData.list[0].humidity)
          setTempMin((weatherData.list[0].temp.min))
          setTempMax((weatherData.list[0].temp.max))
          setPressure(weatherData.list[0].pressure)
          setWind((weatherData.list[0].speed))
          setLoading(false);
        })
    }
    console.log(location);
  }, [location]);
    
    /* const fetchWeatherData = async () => {
      try {
        const locationString = getLocationFromLS();
        const location = JSON.parse(locationString);
        const lat = location.lat;
        const lon = location.lon;

        const apiUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&appid=28e0bac8d6e2712922db61d4a21b1902&units=metric`;

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Error fetching weather data");
        }
        const data = await response.json();

        const currentDate = new Date().toISOString().split("T")[0];

        const weatherData = data.list[0];

        setTemp((weatherData.temp.day).toFixed(0))
        setHumidity(weatherData.humidity)
        setTempMin((weatherData.temp.min).toFixed(0))
        setTempMax((weatherData.temp.max).toFixed(0))
        setPressure(weatherData.pressure)
        setWind((weatherData.speed).toFixed(0))
        setWind((weatherData.speed).toFixed(0))
        setLoading(false);

      } catch (error) {
        console.error("Error fetching weather data:", error);
        setLoading(false);
      }
    };
    fetchWeatherData();
  }, []); */

  return (
    <div className="details-container">
      <h3>Weather Details</h3>
      {loading && <p>Loading...</p>}
      {!loading && (
        <>
        <p>Temperature: <span>{temp}</span>°C</p>
        <p>Humidity: <span>{humidity}</span>%</p>
        <p>Min Temperature: <span>{tempMin}</span>°C</p>
        <p>Max Temperature: <span>{tempMax}</span>°C</p>
        <p>Average Pressure: <span>{pressure}</span> mbar</p>
        <p>Wind: <span>{wind}</span> mph</p>
        </>
      )}
    </div>
  );
};

export default Weatherdetails;