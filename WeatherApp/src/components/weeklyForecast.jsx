import React, { useState, useEffect } from "react";
import "./weeklyForecast.css";
import Popup from "../../routes/Popup";


function WeatherForecast() {
  const [forecastData, setForecastData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [buttonPopup, setButtonPopup] = useState(false);
  

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
    <div className="weekly-container">
      <h2>7-Day Forecast</h2>

      <button onClick={() => setButtonPopup(true)}> Open Popup</button>
      {buttonPopup && <Popup onClose={() => setButtonPopup(false)} />}



      {forecastData && (
        <ul>
          {forecastData.time.map((day, index) => (
            <button key={day}>
              <b>{new Date(day).toLocaleDateString()}</b>
              <p className="details">
                <span>
                  Rainfall: {forecastData.precipitation_sum[index]} mm
                </span>
                <span className="weather-icon">
                  <img
                    src={
                      forecastData.temperature_2m_max[index] > 15
                        ? "./src/images/sunny.png"
                        : "./src/images/background.png}</img>"
                    } //here in the other images use a different image
                    //  alt={forecastData.temperature_2m_max[index] > 15 ? "sunny-img" : "other-img"}
                    style={{ width: "30px", height: "30px" }}
                  />
                </span>
                <span>
                  Max Temp: {forecastData.temperature_2m_max[index]}°C
                </span>
              </p>
              {/* <p>Min Temp: {forecastData.temperature_2m_min[index]}°C</p> */}
            </button>
          ))}
        </ul>
      )}
    </div>
  );
}

export default WeatherForecast;
