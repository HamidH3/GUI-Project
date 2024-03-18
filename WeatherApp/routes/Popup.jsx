
// import React, { useRef, useEffect, useState } from "react";
// import PropTypes from "prop-types";
// import "./Popup.css";
// import { API_KEY } from "../src/API";
// import { getLocationFromLS } from "../src/functions/location";

// function getWeather(selectedDaysData, selectedIndex) {
// const[geoInfo, setGeoInfo] = useState();
//   // Return early if selectedDaysData is falsy
//   if (!selectedDaysData) {
//     return null;
//   }
//   // const lat = 51.9167; // Replace with your desired latitude rn its mile end
//   // const lon = 0.9; // Replace with your desired longitude rn its mile end
  
// const locationString = getLocationFromLS();
// const GEO_URL= `http://api.openweathermap.org/geo/1.0/direct?q=${locationString}&limit=1&appid=${API_KEY}`

//   fetch(GEO_URL)
//     .then((res) => res.json())
//     .then((data) => {
//       data = data[0];
      
//       setGeoInfo(data);
//     })
//     .catch((err) => console.log(err));



// // const location = JSON.parse(locationString); // Parse the string back into an object
//   const lat = geoInfo.lat;
//   const lon = geoInfo.lon;
//   const [temp, setTemp] = useState(''); 
//   const [humidity, setHumidity] = useState('');
//   const [tempMin, setTempMin] = useState('');
//   const [tempMax, setTempMax] = useState('');
//   const [pressure, setPressure] = useState('');
//   const [wind, setWind] = useState('');
//   const [weather, setWeather] = useState('');
//   const [icon, setIcon] = useState('');

//   const url = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  
//   fetch(url)
//     .then((res) => res.json())
//     .then((data) => {
//       const weatherData = data.list[selectedIndex];
//       setTemp((weatherData.temp.day).toFixed(0))
//       setHumidity(weatherData.humidity)
//       setTempMin((weatherData.temp.min).toFixed(0))
//       setTempMax((weatherData.temp.max).toFixed(0))
//       setPressure(weatherData.pressure)
//       setWind((weatherData.speed).toFixed(0))
//       setWind((weatherData.speed).toFixed(0))
//       setWeather(weatherData.weather[0].description)
//       setIcon(weatherData.weather[0].icon)
//     })
//     .catch((err) => console.log(err));

//   var currentDate = new Date();
//   currentDate.setDate(currentDate.getDate() + selectedIndex);
  
//   const today = new Date();
//   const dayToday =
//     currentDate.toDateString() === today.toDateString();
  
//     const dayLabel = dayToday
//     ? "Today"
//     : currentDate.toLocaleDateString("en-US", { weekday: "long" });

//     return (
    // <div>
    //   <img
    //     src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
    //     style={{ width: "100px", height: "100px" }}
    //   ></img>
      
    //   <h2>{dayLabel}</h2>
    //   <h6>{weather}</h6>
      
      
    //   <p>Temperature: <span>{temp}</span>°C</p>
    //   <p>Humidity: <span>{humidity}</span>%</p>
    //   <p>Min Temperature: <span>{tempMin}</span>°C</p>
    //   <p>Max Temperature: <span>{tempMax}</span>°C</p>
    //   <p>Average Pressure: <span>{pressure}</span> mbar</p>
    //   <p>Wind: <span>{wind}</span> mph</p>
    // </div>
//   );
// }

// function Popup({ onClose, isVisible, selectedDaysData, selectedIndex }) {
//   return (
//     <div className={`popup ${isVisible ? "visible" : ""}`}>
//       <button onClick={onClose} className="close">
//         Close
//       </button>
//       {selectedDaysData && getWeather(selectedDaysData, selectedIndex)}
      
//     </div>
//   );
// }

// Popup.propTypes = {
//   onClose: PropTypes.func.isRequired,
//   isVisible: PropTypes.bool.isRequired,
// };

// //new test
// export default Popup;
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./Popup.css";
import { API_KEY } from "../src/API";
import { getLocationFromLS } from "../src/functions/location";

function Popup({ onClose, isVisible, selectedDaysData, selectedIndex }) {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [temp, setTemp] = useState("");
  const [humidity, setHumidity] = useState("");
  const [tempMin, setTempMin] = useState("");
  const [tempMax, setTempMax] = useState("");
  const [pressure, setPressure] = useState("");
  const [wind, setWind] = useState("");
  const [weatherDesc, setWeatherDesc] = useState("");
  const [icon, setIcon] = useState("");
  // const [geoInfo, setGeoInfo] = useState();
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const locationString = getLocationFromLS();
        const GEO_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${locationString}&limit=1&appid=${API_KEY}`;

        const geoResponse = await fetch(GEO_URL);
        if (!geoResponse.ok) {
          throw new Error("Failed to fetch location data");
        }
        const geoData = await geoResponse.json();
        const geoInfo = geoData[0];

        const lat = geoInfo.lat;
        const lon = geoInfo.lon;

        const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

        const weatherResponse = await fetch(weatherUrl);
        if (!weatherResponse.ok) {
          throw new Error("Failed to fetch weather data");
        }
        const weatherData = await weatherResponse.json();
        console.log(weatherData);
        console.log(weatherResponse);
        const Data = weatherData.list[selectedIndex];
              setTemp((Data.temp.day).toFixed(0))
              setHumidity(Data.humidity);
              setTempMin(Data.temp.min.toFixed(0));
              setTempMax(Data.temp.max.toFixed(0));
              setPressure(Data.pressure);
          
              setWind(Data.speed.toFixed(0));
              setWeatherDesc(Data.weather[0].description);
              setIcon(Data.weather[0].icon);
              setWeatherData(Data);
              setLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [selectedIndex]);
  var currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + selectedIndex);

    const today = new Date();
    const dayToday =
      currentDate.toDateString() === today.toDateString();

      const dayLabel = dayToday
      ? "Today"
      : currentDate.toLocaleDateString("en-US", { weekday: "long" });

  return (
    <div className={`popup ${isVisible ? "visible" : ""}`}>
      <button onClick={onClose} className="close">
        Close
      </button>
      {loading ? (
        <p>Loading...</p>
      ) : weatherData ? (
        <div>
          <img
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
            style={{ width: "100px", height: "100px" }}
          ></img>

          <h2>{dayLabel}</h2>
          <h6>{weatherDesc}</h6>

          <p>
            Temperature: <span>{temp}</span>°C
          </p>
          <p>
            Humidity: <span>{humidity}</span>%
          </p>
          <p>
            Min Temperature: <span>{tempMin}</span>°C
          </p>
          <p>
            Max Temperature: <span>{tempMax}</span>°C
          </p>
          <p>
            Average Pressure: <span>{pressure}</span> mbar
          </p>
          <p>
            Wind: <span>{wind}</span> mph
          </p>
        </div>
      ) : (
        <p>Weather data not available</p>
      )}
    </div>
  );
}

Popup.propTypes = {
  onClose: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
  selectedDaysData: PropTypes.array.isRequired,
  selectedIndex: PropTypes.number.isRequired,
};

export default Popup;