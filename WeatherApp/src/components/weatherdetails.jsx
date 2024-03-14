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
  const [uvIndex, setUvIndex] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const locationString = getLocationFromLS();
        const location = JSON.parse(locationString);
        const lat = location.lat;
        const lon = location.lon;

        const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,uv_index_0`;

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Error fetching weather data");
        }
        const data = await response.json();

        const currentDate = new Date().toISOString().split("T")[0];
        const currentIndex = data.daily.time.indexOf(currentDate);
        const uvIndexData = data.daily.uv_index_0[currentIndex];
        const temperatureData = data.daily.temperature_2m_max[currentIndex];

        setUvIndex(uvIndexData);
        setTemperature(temperatureData);
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
          <p>UV Index: {uvIndex}</p>
          <p>Temperature: {temperature}°C</p>
        </>
      )}
    </div>
  );
};

export default Weatherdetails;