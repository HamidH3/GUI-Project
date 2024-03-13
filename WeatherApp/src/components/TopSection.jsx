import React, { useState, useEffect } from 'react';
import './TopSection.css';
import { GEO_URL, CURRENT_WEATHER_URL, API_KEY } from "../API"

const SearchBar = ({ onLocationChange }) => {
  const [searchInput, setSearchInput] = useState("");
  const [locationData, setLocationData] = useState();
  const [currentWeatherData, setCurrentWeatherData] = useState();

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  const searchLocation = (event) => {
    if(event.key === "Enter"){
      fetch(`${GEO_URL}/direct?q=${searchInput}&limit=5&appid=${API_KEY}`)
      .then((response) => response.json())
      .then((response) => {
        setLocationData(response.data);
        })
    }
  };

  useEffect(() => {
    onLocationChange(searchInput);
  }, [searchInput]);

  return (
    <div className="searchBar">
      <input type="text" placeholder="Enter a location" value={searchInput} onChange={handleSearchChange} onKeyPress={searchLocation} />
    </div>
  );
};

const TopSection = ({ location }) => {

  return (
    <div className="topSec">
      <p>{location}</p>
    </div>
  );
};

const WeatherApp = (data) => {
  const [location, setLocation] = useState();
  const [temperature, setTemperature] = useState(null);
//  const lat = data.latitude
//  const lon = data.longitude
//  const currentWeather = fetch(`${CURRENT_WEATHER_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
  
  return (
    <div>
      <SearchBar onLocationChange={setLocation} />
      <TopSection location={location} />
    </div>
  );
};

export default WeatherApp; 