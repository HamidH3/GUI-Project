import React, { useState, useEffect } from "react";
import "./weeklyForecast.css";
import Popup from "../../routes/Popup";
import { getLocationFromLS } from "../functions/location";
import {API_KEY} from "../API";

function WeeklyForecast({ location }) {
  // States for managing forecast data and loading status
  const [forecastData, setForecastData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // States for managing the popup display
  const [buttonPopup, setButtonPopup] = useState(false);
  const [selectedDaysData, setSelectedDaysData] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  // State for storing geocoding data
  const [geoInfo, setGeoInfo] = useState();

  // Function triggered when a day is clicked
  function buttonClickHandle(index) {
    setSelectedIndex(index); // Set your selectedIndex
    setButtonPopup(true); // Show popup
    setSelectedDaysData(true);
  }
  

  // Function to fetch weather data for the forecast
  const fetchWeatherData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Use GEO API call to get the lat and lon
      // Use lat and lon to get data from openweather using an API call
      const GEO_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${API_KEY}`;
      // Fetch geocoding data first (to get latitude and longitude)
      fetch(GEO_URL)
        .then((res) => res.json())
        .then((data) => {
          data = data[0];
          setGeoInfo(data);

          const lat = data.lat;
          const lon = data.lon;
          //once we retreive the lat and lon of a searched/default location, we can assign it to our weather api to get relevant
          // weather information about that location
          const apiUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

          return fetch(apiUrl); // Fetch weather data using lat/lon
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error fetching weather data");
          }
          return response.json();
        })
        .then((data) => {
          setForecastData(data);
        })
        .catch((error) => {
          setError(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };
  // Fetch weather data on mount and when 'location' changes
  useEffect(() => {
    fetchWeatherData();
  }, [getLocationFromLS, location]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // Generate the daily forecast components using a for loop for the next 7 days (weekly forecast)
  let id = -1;
  const days = [];
  for (let index = 0; index < 7; index++) {
    id++;
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + index);
    const today = new Date();
    const dayToday = currentDate.toDateString() === today.toDateString();
    // Determine the day label ("Today" or the weekday)
    const dayLabel = dayToday
      ? "Today"
      : currentDate.toLocaleDateString("en-US", { weekday: "long" });

    days.push(
      <div key={id} className="info-container">
        {forecastData && (
          <button onClick={() => buttonClickHandle(index)} key={id}>
            <div className="center">
              <b>{dayLabel}</b>
    
                <img
                  className="weatherIcon"
                  src={`https://openweathermap.org/img/wn/${forecastData.list[id].weather[0].icon}@2x.png`}
                />
            
              <ul>{forecastData.list[id].temp.day.toFixed(0)}°C</ul>
              <ul>{forecastData.list[id].humidity}%</ul>
            </div>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="weekly-container">
      <h2>7-Day Forecast</h2>
      {buttonPopup && (
        //here when we call popup, we set its visibility to true as it appears
        //when we click on the button, which in this case is any given day from the weekly forecast
        <Popup
          onClose={() => setButtonPopup(false)}
          isVisible={true}
          selectedDaysData={selectedDaysData}
          selectedIndex={selectedIndex}
        />
      )}
      {days}
    </div>
  );
}

export default WeeklyForecast;