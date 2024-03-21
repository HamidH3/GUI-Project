import React, { useState, useEffect } from "react";
import "./weatherdetails.css";
import { setLocationInLS } from "../functions/location";
import { API_KEY } from "../API";
import Chart from "chart.js/auto"; 

const Weatherdetails = ({ location }) => {
  // State variables for weather details
  const [temp, setTemp] = useState("");
  const [humidity, setHumidity] = useState("");
  const [tempMin, setTempMin] = useState("");
  const [tempMax, setTempMax] = useState("");
  const [pressure, setPressure] = useState("");
  const [wind, setWind] = useState("");
  const [precipitationData, setPrecipitationData] = useState([]);
  const [loading, setLoading] = useState(true); 

  // Fetch weather details on initial mount and when 'location' changes 
  useEffect(() => {
    const fetchWeatherDetails = async () => {
      if (!location) {
        console.log(location)
        // Fetch details for default location (Mile End)
        const mileEndLat = 51.5250913; 
        const mileEndLon = -0.0350468;
        const weatherURL = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${mileEndLat}&lon=${mileEndLon}&appid=${API_KEY}&units=metric`;

        try {
          const response = await fetch(weatherURL);
          const weatherData = await response.json();
          setWeatherDetails(weatherData); 
          setLoading(false); 
        } catch (error) {
          console.log("Error fetching weather data");
          setLoading(false); 
        }

      } else {
        // Fetch details based on user-provided location
        const GEO_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${API_KEY}`;

        try {
          const geoResponse = await fetch(GEO_URL);
          const geoData = await geoResponse.json();

          if (geoData.length > 0) {
            const lat = geoData[0].lat;
            const lon = geoData[0].lon;
            const weatherURL = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

            const weatherResponse = await fetch(weatherURL);
            const weatherData = await weatherResponse.json();
            setWeatherDetails(weatherData); 
            setLoading(false);
          }

        } catch (error) {
          console.log("Error fetching weather data");
          setLoading(false); 
        }
      }
    };

    fetchWeatherDetails(); 
    /*here we pass through location in the dependancy array of the use effect hook
    incase it changes and we want the effect to be re-executed*/
  }, [location]);

  // Function to extract and store weather details
  const setWeatherDetails = (weatherData) => {
    const firstDayData = weatherData.list[0];
    setTemp(firstDayData.temp.day);
    setHumidity(firstDayData.humidity);
    setTempMin(firstDayData.temp.min);
    setTempMax(firstDayData.temp.max);
    setPressure(firstDayData.pressure);
    setWind(firstDayData.speed);

  };


  return (
    <div className="details-container">
      <h2>Weather Details</h2>
      {loading && <p>Loading...</p>}
      {!loading && (
        <>
          <div className="tempBox">
           
            <p>
              Min Temperature: <span>{tempMin}</span>°C
            </p>
            <p>
              Max Temperature: <span>{tempMax}</span>°C
            </p>
          </div>
          <div className="otherDetails">
            <div className="detailBox">
              <p>
                Temperature: <span>{temp}</span>°C
              </p>
            </div>
            <div className="detailBox">
              <p>
                Humidity: <span>{humidity}</span>%
              </p>
            </div>

            <div className="detailBox">
              <p>
                Average Pressure: <span>{pressure}</span> mbar
              </p>
            </div>
            <div className="detailBox">
              <p>
                Wind: <span>{wind}</span> mph
              </p>
            </div>
          </div>
          {/* {!loading && (
            <canvas id="precipitationChart" width="400" height="200"></canvas>
          )} */}
        </>
      )}
    </div>
  );
};

export default Weatherdetails;
