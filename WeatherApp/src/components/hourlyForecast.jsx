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
      const key = "557c3851a3d530fbd26a94d193c33403";
      const URL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m`;

      try {
        const response = await fetch(URL);
        if (!response.ok) {
          throw new Error("Failed to fetch hourly forecast data");
        }

        const data = await response.json();
        const currentTime = new Date();
        const next24Hours = new Date(
          currentTime.getTime() + 24 * 60 * 60 * 1000
        );
        const filteredData = data.hourly.time.filter(
          (time) => new Date(time) <= next24Hours
        );
        const filteredForecast = {
          time: filteredData,
          temperature_2m: data.hourly.temperature_2m.slice(
            0,
            filteredData.length
          ),
        };
        setHourlyForecast(filteredForecast);
      } catch (error) {
        console.error("Error fetching hourly forecast data:", error);
      }
    };

    getHourly();
  }, []);

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    // Options for formatting the date
    const options = { hour: "numeric", minute: "numeric", hour12: true };
    // Format the date using Intl.DateTimeFormat
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  return (
    <div className="hourly">
      {hourlyForecast &&
      hourlyForecast.time &&
      hourlyForecast.temperature_2m ? (
        hourlyForecast.time.map((time, index) => (
          <div className="time-block" key={index}>
            <p>{formatTime(time)}</p>
            <p>{hourlyForecast.temperature_2m[index]}°C</p>
          </div>
        ))
      ) : (
        <p>Loading hourly forecast data...</p>
      )}
    </div>
  );
};

export default HourlyForecast;
