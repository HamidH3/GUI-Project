import React, { useState, useEffect } from "react";
import "./weeklyForecast.css";
import Popup from "../../routes/Popup";
//import getWeather from "../../routes/Popup";
import { getLocationFromLS } from "../functions/location";
//import {CSSTransition} from "react-transition-group";


function WeeklyForecast() {
  const [forecastData, setForecastData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [buttonPopup, setButtonPopup] = useState(false); //initially, button pop is set to false and not visible, when pop up button is triggered, it changes state to true and when 'close' is clicked, it triggers the 'onClose', therefore closing the popup.
  const [selectedDaysData, setSelectedDaysData] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  function buttonClickHandle(index){
    // set your selectedIndex
    setSelectedIndex(index);
    setButtonPopup(true);
    setSelectedDaysData(true);
  }



  const fetchWeatherData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const locationString = getLocationFromLS();
      const location = JSON.parse(locationString); // Parse the string back into an object
      const lat = location.lat;
      const lon = location.lon;
      // const lat = 51.9167; // Replace with your desired latitude rn its mile end
      // const lon = 0.9; // Replace with your desired longitude rn its mile end
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

  console.log("selectedIndex:", selectedIndex)
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

      {/* <CSSTransition
      in= {buttonPopup}
      timeout={500}
      classNames={'popup'}
      unmountOnExit/>
       <Popup
          onClose={() => setButtonPopup(false)}
          // isVisible={true}
          selectedDaysData={selectedDaysData}
          selectedIndex={selectedIndex}
        />
      <CSSTransition/>
         */}

      {/* checks 'buttonPopup' state variable. if true, it renders popup component, then it passes through the onClose function that sets the buttonPopup to false if it is called by pressing close button.
      It also passes the selectedDaysData to the popup */}
      {forecastData && (
        
        <ul>
          {forecastData.time.map((day, index) => {
            const currentDate = new Date(day);
            //creates new date object
            const today = new Date();
            //creates new date object containing date and time
            const dayToday =
              currentDate.toDateString() === today.toDateString();
            //compares day to date to see if calender values are the same, returns true or false
            const dayLabel = dayToday
              ? "Today"
              : currentDate.toLocaleDateString("en-US", { weekday: "long" });
            //assigns value of today to dayLabel if dayToday is true
            return (
              // <button onClick={() => setButtonPopup(true)} key={day}>
              <button onClick={() => buttonClickHandle(index)} key={day}>
                
                <b>{dayLabel}</b>
                <p className="details">
                  <span>
                    Rainfall: {forecastData.precipitation_sum[index]} mm
                  </span>
                  
                  <span className="weather-icon">
                    <img
                      src={
                        forecastData.temperature_2m_max[index] > 14
                          ? "./src/images/sunny.svg"
                          : "./src/images/partly_cloudy.svg"
                      }
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
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default WeeklyForecast;