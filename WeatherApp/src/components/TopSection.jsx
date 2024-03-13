import React, { useState, useEffect } from 'react';
import './TopSection.css';
import { CURRENT_WEATHER_URL, API_KEY } from "../API"

//const GEO_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${city_name}&limit=1&appid=${API_KEY}`;

const SearchBar = ({ onLocationChange }) => {
  const [searchInput, setSearchInput] = useState("");
  const [locationData, setLocationData] = useState();
  const [currentWeatherData, setCurrentWeatherData] = useState();

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);

  };

  const searchLocation = (event) => {
    const GEO_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${searchInput}&limit=1&appid=${API_KEY}`;

    if(event.key === "Enter"){
      fetch(`${GEO_URL}`)
      .then((response) => response.json())
      .then((response) => {
        setLocationData(response);
        // console.log(response)
        })
    }
  };

  useEffect(() => {
    onLocationChange(searchInput);
  }, [locationData]);
console.log(locationData);
  return (
    <div className="searchBar">
      <input type="text" placeholder="Enter a location" value={searchInput} onChange={handleSearchChange} onKeyPress={searchLocation} />
    </div>
  );
};

const TopSection = ({ location, currentWeather }) => {

  return (
    <div className="topSec">
      <p>{currentWeather}</p>

      <p>{location}</p>
    </div>
  );
};

// const WeatherApp = () => {
//   const [location, setLocation] = useState();
//   const [currentWeather, setCurrentWeather] = useState();
//   const [temperature, setTemperature] = useState(null);
//   const GEO_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${API_KEY}`;
//   fetch(`${GEO_URL}`)
//   .then((response) => response.json())
//   .then((response) => {
//   const lat = response[0].lat;
//   const lon = response[0].lon;
//    const currentWeather = fetch(`${CURRENT_WEATHER_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
// setCurrentWeather(currentWeather);

//   })
const WeatherApp = () => {
  const [location, setLocation] = useState();
  const [currentWeather, setCurrentWeather] = useState(null);
  const [temperature, setTemperature] = useState(null);

  useEffect(() => {
    if (location) {
      const GEO_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${API_KEY}`;

      fetch(GEO_URL)
        .then((response) => response.json())
        .then((data) => {
          const lat = data[0].lat;
          const lon = data[0].lon;
          const weatherURL = `${CURRENT_WEATHER_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

          return fetch(weatherURL);
        })
        .then((response) => response.json())
        .then((weatherData) => {
          setCurrentWeather(weatherData);
          setTemperature(weatherData.main.temp); // Assuming temperature is in main.temp property
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
        });
    }
  }, [location]);

  //  const currentWeather = fetch(`${CURRENT_WEATHER_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)

  return (
    <div>
      <SearchBar onLocationChange={setLocation} />
      <TopSection location={temperature} />
    </div>
  );
};

export default WeatherApp; 