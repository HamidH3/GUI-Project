// import React from 'react';
// import "./weeklyForecast.css";

// const WeeklyForecast = () => {
//     return (
//       <div className="weekly-container">
//         <h3>Weekly</h3>
//         <p>
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum labore
//           nesciunt est sed, modi ullam accusamus in necessitatibus quas neque
//           doloremque. Adipisci, ab soluta. Molestiae cupiditate nobis
//           praesentium eveniet nihil.
//         </p>

//         <p>
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum labore
//           nesciunt est sed, modi ullam accusamus in necessitatibus quas neque
//           doloremque. Adipisci, ab soluta. Molestiae cupiditate nobis
//           praesentium eveniet nihil.
//         </p>
//       </div>
//     );
// };

// export default WeeklyForecast;

import React, { useState, useEffect } from "react";

function WeatherForecast() {
  const [forecastData, setForecastData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeatherData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const lat = 51.9167; // Replace with your desired latitude rn its mile end
      const lon = 0.9; // Replace with your desired longitude rn its mile end
      const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=Europe/London`;

      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error("Error fetching weather data");
      }

      const data = await response.json();
      setForecastData(data.daily);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>7-Day Forecast</h2>
      {forecastData && (
        <ul>
          {forecastData.time.map((day, index) => (
            <li key={day}>
              <b>{new Date(day).toLocaleDateString()}</b>
              <p>Max Temp: {forecastData.temperature_2m_max[index]}Â°C</p>
              <p>Min Temp: {forecastData.temperature_2m_min[index]}Â°C</p>
              <p>Rainfall: {forecastData.precipitation_sum[index]} mm</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default WeatherForecast;
