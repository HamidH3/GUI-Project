import React, { useState, useEffect } from "react";
import "./weeklyForecast.css";
import Popup from "../../routes/Popup";
//import getWeather from "../../routes/Popup";
import { getLocationFromLS } from "../functions/location";
//import {CSSTransition} from "react-transition-group";
//import API_KEY from "../functions/location";


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
      const key = "28e0bac8d6e2712922db61d4a21b1902";
      //const apiUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=7&appid=${key}&units=metric`
      const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=28e0bac8d6e2712922db61d4a21b1902&units=metric`;

      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error("Error fetching weather data");
      }

      const data = await response.json();
      setForecastData(data);
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


  
let id = -1;
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


    {[...Array(7)].map((day, index) => {
      id += 1; 
      //const currentDate = new Date(day);
      var currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + index);
            //creates new date object
      const today = new Date();
            //creates new date object containing date and time
      const dayToday =
        currentDate.toDateString() === today.toDateString();
      const dayLabel = dayToday
        ? "Today"
        : currentDate.toLocaleDateString("en-US", { weekday: "long" });

        return (
        <div>          
          {forecastData && (
            <button onClick={() => buttonClickHandle(index)} key={day}>
              <div class="center">
                <b>{dayLabel}</b>
                <ul>
                  Max Temperature: {(forecastData.list[id].main.temp).toFixed(0)}°C
                </ul>
                <ul>
                  Humidity: {forecastData.list[id].main.humidity}%
                </ul>
              </div>
            </button> 
          )}
        </div>
      );
    })}
  </div>
);
}

export default WeeklyForecast;
