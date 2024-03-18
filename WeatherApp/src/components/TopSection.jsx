import React, { useState, useEffect, useRef } from "react";
import "./TopSection.css";
import { CURRENT_WEATHER_URL, API_KEY } from "../API";
import { getLocationFromLS, setLocationInLS } from "../functions/location";

const WeatherApp = () => {
  const [location, setLocation] = useState(getLocationFromLS());
  const [temperature, setTemperature] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const searchRef = useRef(null); // Reference to the input field
  const [searchedValue, setSearchedValue] = useState(null); // State to store the last clicked suggestion
  const [weatherDesc, setWeatherDesc] = useState("");
  const [icon, setIcon] = useState(null);
  

  useEffect(() => {
    // Hide search if the user clicks outside of the search area
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchInput.length > 2) {
      const GEO_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${searchInput}&limit=5&appid=${API_KEY}`;
      fetch(GEO_URL)
        .then((response) => response.json())
        .then((data) => {
          // Filter for unique suggestions
          const uniqueSuggestions = data.filter((item, index, self) => {
            const label = `${item.name}, ${item.country}${item.state ? `, ${item.state}` : ""
              }`;
            return (
              index ===
              self.findIndex((s) => {
                const sLabel = `${s.name}, ${s.country}${s.state ? `, ${s.state}` : ""
                  }`;
                return sLabel === label;
              })
            );
          });
          setSuggestions(
            data.map((item) => {
              // Construct the display label
              let label = `${item.name}, ${item.country}`;
              if (item.state) {
                label += `, ${item.state}`;
              }
              return label;
            })
          );
        })
        .catch(() => setSuggestions([]));
    } else {
      setSuggestions([]);
    }
  }, [searchInput]);

  useEffect(() => {
    if (!location) {
      const mileEndLat = 51.5250913; // Mile End's latitude
      const mileEndLon = -0.0350468; // Mile End's longitude
      const weatherURL = `${CURRENT_WEATHER_URL}/weather?lat=${mileEndLat}&lon=${mileEndLon}&appid=${API_KEY}&units=metric`;

      fetch(weatherURL)
        .then((response) => response.json())
        .then((weatherData) => {
          setLocation(weatherData.name);
          setTemperature(weatherData.main.temp);
          setWeatherDesc(weatherData.weather[0].description);
          setIcon(weatherData.weather[0].icon);
        })
    } 
    else{
      const GEO_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${API_KEY}`;

      fetch(GEO_URL)
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            const lat = data[0].lat;
            const lon = data[0].lon;
            const weatherURL = `${CURRENT_WEATHER_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
            setLocationInLS(location);
            console.log("suggestion in else: ",searchedValue);
            return fetch(weatherURL);
          }
        })
        .then((response) => response.json())
        .then((weatherData) => {
          console.log(weatherData);
          setLocation(`${weatherData.name}, ${weatherData.sys.country}`);
          setTemperature(weatherData.main.temp);
          setWeatherDesc(weatherData.weather[0].description);
          setIcon(weatherData.weather[0].icon);
        })

    }
    console.log("default loc", location);
  }, [searchedValue]);

  const handleSearchClick = () => {
    setShowSearch(!showSearch);
  };

  const handleSuggestionClick = (suggestion) => {
    console.log("sug", suggestion);
    setSearchInput(suggestion);
    setLocation(suggestion);
    console.log("I pressed", location);
    setSearchedValue(suggestion);
    setShowSearch(false);
  };
  


  return (
    <div className="container">
      <button className="searchButton" onClick={handleSearchClick}>
        {showSearch ? "Hide Search" : "Show Search"}
      </button>
      {showSearch && (
        <div className="searchBar">
          <input
            type="text"
            placeholder="Enter a location"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          {suggestions.length > 0 && (
            <ul className="suggestions">
              {suggestions.map((suggestion, index) => (
                <li
                  key={`${suggestion}-${index}`}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
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
