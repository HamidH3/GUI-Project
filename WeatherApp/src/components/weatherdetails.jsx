import React, { useState, useEffect } from "react";
import "./weatherdetails.css";
import { setLocationInLS } from "../functions/location";
import { API_KEY } from "../API";
import Chart from "chart.js/auto";

const Weatherdetails = ({ location }) => {
  const [temp, setTemp] = useState("");
  const [humidity, setHumidity] = useState("");
  const [tempMin, setTempMin] = useState("");
  const [tempMax, setTempMax] = useState("");
  const [pressure, setPressure] = useState("");
  const [wind, setWind] = useState("");
  const [precipitationData, setPrecipitationData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!location) {
      const mileEndLat = 51.5215; // Mile End's latitude
      const mileEndLon = -0.0397; // Mile End's longitude
      const weatherURL = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${mileEndLat}&lon=${mileEndLon}&appid=${API_KEY}&units=metric`;

      fetch(weatherURL)
        .then((response) => response.json())
        .then((weatherData) => {
          setWeatherDetails(weatherData);
          setLoading(false);
        })
        .catch(() => {
          console.log("Error fetching weather data");
          setLoading(false);
        });
    } else {
      const GEO_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${API_KEY}`;

      fetch(GEO_URL)
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            const lat = data[0].lat;
            const lon = data[0].lon;
            const weatherURL = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
            setLocationInLS(lat, lon);
            return fetch(weatherURL);
          }
        })
        .then((response) => response.json())
        .then((weatherData) => {
          setWeatherDetails(weatherData);
          setLoading(false);
        })
        .catch(() => {
          console.log("Error fetching weather data");
          setLoading(false);
        });
    }
  }, [location]);
  /////////////////////////////////ADDED GRAPH
  const setWeatherDetails = (weatherData) => {
    const firstDayData = weatherData.list[0];
    setTemp(firstDayData.temp.day);
    setHumidity(firstDayData.humidity);
    setTempMin(firstDayData.temp.min);
    setTempMax(firstDayData.temp.max);
    setPressure(firstDayData.pressure);
    setWind(firstDayData.speed);

    const precipitation = weatherData.list.map((item) => ({
      time: new Date(item.dt * 1000),
      precipitation: item.rain ? item.rain["3h"] : 0,
    }));
    setPrecipitationData(precipitation);
  };

  useEffect(() => {
    if (!loading && precipitationData.length > 0) {
      renderChart();
    }
  }, [precipitationData, loading]);

  const renderChart = () => {
    const ctx = document.getElementById("precipitationChart");
    if (ctx) {
      const existingChartInstance = Chart.getChart(ctx);
      if (existingChartInstance) {
        // If there's an existing Chart instance, destroy it
        existingChartInstance.destroy();
      }
      new Chart(ctx, {
        type: "line",
        data: {
          labels: precipitationData.map((item) =>
            item.time.toLocaleDateString()
          ),
          datasets: [
            {
              label: "Precipitation Level",
              data: precipitationData.map((item) => item.precipitation),
              fill: false,
              borderColor: "rgba(75, 192, 192, 1)",
              tension: 0.1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              title: {
                display: true,
                text: "Precipitation (mm)",
                color: "white",
              },
              beginAtZero: true,
              color: "white",
            },
            x: {
              title: {
                display: true,
                text: "Date",
                color: "white",
              },
              ticks: {
                color: "white",
              },
            },
          },
        },
      });
    }
  };
  /////////////////////////////////////////////////
  return (
    <div className="details-container">
      <h2>Weather Details</h2>
      {loading && <p>Loading...</p>}
      {!loading && (
        <>
          <div className="tempBox">
           
            <p>
              Min Temperature: <br></br><span>{tempMin}</span>°C
            </p>
            <p>
              Max Temperature: <br></br><span>{tempMax}</span>°C
            </p>
          </div>
          <div className="otherDetails">
            <div className="detailBox">
              <p>
                Temperature: <br></br><span>{temp}</span>°C
              </p>
            </div>
            <div className="detailBox">
              <p>
                Humidity: <br></br><span>{humidity}</span>%
              </p>
            </div>

            <div className="detailBox">
              <p>
                Average Pressure: <br></br><span>{pressure}</span> mbar
              </p>
            </div>
            <div className="detailBox">
              <p>
                Wind: <br></br><span>{wind}</span> mph
              </p>
            </div>
          </div>
          {!loading && (
            <canvas id="precipitationChart" width="400" height="200"></canvas>
          )}
        </>
      )}
    </div>
  );
};

export default Weatherdetails;
