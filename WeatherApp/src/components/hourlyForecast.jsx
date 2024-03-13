// import React from "react";
// import "./hourlyForecast.css";
// const getHourly() {
//   const lat = 51.9167; // Replace with your desired latitude rn its mile end
//   const lon = 0.9; // Replace with your desired longitude rn its mile end
//   const key = "557c3851a3d530fbd26a94d193c33403";
//   const URL = `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&appid=${key}`;

//   return (
//     fetch(URL)
//       //basically a try catch
//       .then((result) => result.json)
//       .then((data) => {
//         console.log(data); // handle the API response data here
//       })
//       .catch((error) => console.log(error))
//   );
// }

// const HourlyForecast = () => {
//   return (

//     <div className="hourly">
//       <div className="time-block">6:00 AM</div>
//       <div className="time-block">7:00 AM</div>
//       <div className="time-block">8:00 AM</div>
//       <div className="time-block">9:00 AM</div>
//       <div className="time-block">10:00 AM</div>
//       <div className="time-block">6:00 AM</div>
//       <div className="time-block">7:00 AM</div>
//       <div className="time-block">8:00 AM</div>
//       <div className="time-block">9:00 AM</div>
//       <div className="time-block">10:00 AM</div>
//     </div>
//   );
// };

// export default HourlyForecast;

import React, { useState, useEffect } from "react";
import "./hourlyForecast.css";

const HourlyForecast = () => {
  const [hourlyForecast, setHourlyForecast] = useState([]);

  useEffect(() => {
    const getHourly = async () => {
      const lat = 51.9167; // Replace with your desired latitude
      const lon = 0.9; // Replace with your desired longitude
      const key = "28e0bac8d6e2712922db61d4a21b1902";
      // const URL = `https://api.open-meteo.com/v1/forecast?latitude=${lat.toString()}&longitude=${lon.toString()}&hourly=temperature_2m`;
      // const URL = `https://api.open-meteo.com/v1/forecast?latitude=${(lat)}&longitude=${(lon)}&hourly=temperature_2m`;
      const URL = `https://history.openweathermap.org/data/2.5/history/city?id=2885679&type=hour&appid=28e0bac8d6e2712922db61d4a21b1902`;
      try {
        const response = await fetch(URL);
        if (!response.ok) {
          throw new Error("Failed to fetch hourly forecast data");
        }
        const data = await response.json();
        const currentTime = new Date();
        const next24Hours = new Date(currentTime.getTime() + 24 * 60 * 60 * 1000);
        const filteredData = data.list.filter((item) => new Date(item.dt) <= next24Hours);
        setHourlyForecast(filteredData);
      } catch (error) {
        console.error("Error fetching hourly forecast data:", error);
      }
    };

    getHourly();
  }, []);

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    const options = { hour: "numeric", minute: "numeric", hour12: true };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };


  return (
    <div className="hourly">
      {hourlyForecast.length > 0 ? (
        hourlyForecast.map((item, index) => (
          <div className="time-block" key={index}>
            <p>{formatTime(item.dt * 1000)}</p>
            <p>{(item.main.temp - 273.15).toFixed(2)}°C</p>
          </div>
        ))
      ) : (
        <p>Loading hourly forecast data...</p>
      )}
    </div>
  );
};

export default HourlyForecast;
