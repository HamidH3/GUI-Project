import React, { useState, useEffect } from "react";
import "./weeklyForecast.css";
import Popup from "../../routes/Popup";
//import getWeather from "../../routes/Popup";
import { getLocationFromLS } from "../functions/location";
//import {CSSTransition} from "react-transition-group";
import {API_KEY} from "../API";

function WeeklyForecast({ location }) {
  const [forecastData, setForecastData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [buttonPopup, setButtonPopup] = useState(false); //initially, button pop is set to false and not visible, when pop up button is triggered, it changes state to true and when 'close' is clicked, it triggers the 'onClose', therefore closing the popup.
  const [selectedDaysData, setSelectedDaysData] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [geoInfo, setGeoInfo] = useState();

  function buttonClickHandle(index) {
    // set your selectedIndex
    setSelectedIndex(index);
    setButtonPopup(true);
    setSelectedDaysData(true);
  }

  const fetchWeatherData = async () => {
    setIsLoading(true);
    setError(null);

    //   try {
    //     const locationString = getLocationFromLS();
    //     const GEO_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${locationString}&limit=1&appid=${API_KEY}`;

    //     fetch(GEO_URL)
    //       .then((res) => res.json())
    //       .then((data) => {
    //         data = data[0];

    //         setGeoInfo(data);
    //           const lat = geoInfo.lat;
    //           const lon = geoInfo.lon;
    //       })
    //       .catch((err) => console.log("error haha",err));

    //     //const apiUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=7&appid=${key}&units=metric`
    //     const apiUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&appid=28e0bac8d6e2712922db61d4a21b1902&units=metric`;

    //     const response = await fetch(apiUrl);

    //     if (!response.ok) {
    //       throw new Error("Error fetching weather data");
    //     }

    //     const data = await response.json();
    //     setForecastData(data);
    //   } catch (error) {
    //     setError(error.message);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    try {
      const locationString = getLocationFromLS();
      const GEO_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${API_KEY}`;

      fetch(GEO_URL)
        .then((res) => res.json())
        .then((data) => {
          data = data[0];
          setGeoInfo(data);

          const lat = data.lat;
          const lon = data.lon;
          const apiUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

          return fetch(apiUrl);
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
  useEffect(() => {
    fetchWeatherData();
  }, [getLocationFromLS, location]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // let id = -1;
  // return (
  //   <div className="weekly-container">
  //     <h2>7-Day Forecast</h2>
  //     {buttonPopup && (
  //       <Popup
  //         onClose={() => setButtonPopup(false)}
  //         isVisible={true}
  //         selectedDaysData={selectedDaysData}
  //         selectedIndex={selectedIndex}
  //       />
  //     )}

  //     {[...Array(7)].map((day, index) => {
  //       id += 1;
  //       //const currentDate = new Date(day);
  //       var currentDate = new Date();
  //       currentDate.setDate(currentDate.getDate() + index);
  //       //creates new date object
  //       const today = new Date();
  //       //creates new date object containing date and time
  //       const dayToday = currentDate.toDateString() === today.toDateString();
  //       const dayLabel = dayToday
  //         ? "Today"
  //         : currentDate.toLocaleDateString("en-US", { weekday: "long" });

  //       return (
  //         <div key={id}>
  //           {forecastData && (
  //             <button onClick={() => buttonClickHandle(index)} key={day}>
  //               <div className="center">
  //                 <b>{dayLabel}</b>
  //                 <p className="img">
  //                   <img
  //                     src={`https://openweathermap.org/img/wn/${forecastData.list[id].weather[0].icon}@2x.png`}
  //                     style={{ width: "40px", height: "40px" }}
  //                   ></img>
  //                 </p>
  //                 <ul>{forecastData.list[id].temp.day.toFixed(0)}°C</ul>
  //                 <ul>{forecastData.list[id].humidity}%</ul>
  //               </div>
  //             </button>
  //           )}
  //         </div>
  //       );
  //     })}
  //   </div>
  // );
  //}
  let id = -1;
  const days = [];
  for (let index = 0; index < 7; index++) {
    id++;
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + index);
    const today = new Date();
    const dayToday = currentDate.toDateString() === today.toDateString();
    const dayLabel = dayToday
      ? "Today"
      : currentDate.toLocaleDateString("en-US", { weekday: "long" });

    days.push(
      <div key={id} className="info-container">
        {forecastData && (
          <button onClick={() => buttonClickHandle(index)} key={id}>
            <div className="center">
              <b>{dayLabel}</b>
              <p className="img">
                <img
                  src={`https://openweathermap.org/img/wn/${forecastData.list[id].weather[0].icon}@2x.png`}
                  style={{ width: "40px", height: "40px" }}
                  alt=""
                />
              </p>
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