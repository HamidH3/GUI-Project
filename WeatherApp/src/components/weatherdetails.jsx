// import React from "react";
// import "./weatherdetails.css";



// const Weatherdetails = () => {
//   return (
//     <div className="details-container">
//       <h3>weather details</h3>
     
//       <p>
//         Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam eaque
//         repudiandae nostrum ratione. Nemo laborum accusantium porro at enim,
//         quam magnam fugiat vero natus, itaque quaerat, pariatur obcaecati!
//         Doloribus, consectetur!
//       </p>
//     </div>
//   );
// };

// Weatherdetails.propTypes = {};

// export default Weatherdetails;
import React, { useState, useEffect } from "react";
import "./weatherdetails.css";
import { getLocationFromLS } from "../functions/location";

const Weatherdetails = () => {
  const [temp, setTemp] = useState(''); 
  const [humidity, setHumidity] = useState('');
  const [tempMin, setTempMin] = useState('');
  const [tempMax, setTempMax] = useState('');
  const [pressure, setPressure] = useState('');
  const [wind, setWind] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
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
        setWeather(weatherData.weather[0].description)
        setIcon(weatherData.weather[0].icon)
        setLoading(false);

      } catch (error) {
        console.error("Error fetching weather data:", error);
        setLoading(false);
      }
    };
    fetchWeatherData();
  }, []);

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