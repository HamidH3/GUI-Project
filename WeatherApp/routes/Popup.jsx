// import React, { useRef } from "react";
// import PropTypes from "prop-types";
// import "./Popup.css";
// import { API_KEY } from "../src/API";
// import {getLocationFromLS, getSelectedDayFromLS } from "../src/functions/location";

// function getWeather(selectedDaysData) {
//   if (selectedDaysData) {
//     const selectedDate = getSelectedDayFromLS
//     const lat = 51.9167; // Replace with your desired latitude rn its mile end
//     const lon = 0.9; // Replace with your desired longitude rn its mile end
//     // const locationString = getLocationFromLS();
//     // const location = JSON.parse(locationString); // Parse the string back into an object
//     // const lat = location.lat;
//     // const lon = location.lon;
   
//     const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
//     fetch(url)
//       .then((res) => res.json())
//       .then((data) => {
//         // INPUT DIFFERENT VALUES HERE
//         const weatherData = data.list[0].main;
//         //  const weatherData = data.list.find((item) => {
//         //    const itemDate = new Date(item.dt * 1000); // Convert item's timestamp to Date object
//         //    return itemDate.toDateString() === selectedDate.toDateString(); // Check if item's date matches the selected date
//         //  });
//        if (weatherData){
//         document.getElementById("weather").innerHTML = (
//           weatherData.temp - 273.15
//         ).toFixed(1);
//         document.getElementById("humidity").innerHTML = weatherData.humidity;
//        }else {
//           console.log("Weather data not available for the selected date");
//        }
//       })

//       .catch((err) => console.log(err));
//     return (
//       // CHANGE HTML TEXT HERE
//       <div>
//         Temperature: <span id="weather"></span>
//         <br />
//         Humidity: <span id="humidity"></span>
//       </div>
//     );
//   }
// }

// function Popup({ onClose, isVisible, selectedDaysData }) {
//   return (
//     <div className={`popup ${isVisible ? "visible" : ""}`}>
//       <button onClick={onClose} className="close">
//         Close
//       </button>
//       {selectedDaysData && getWeather(selectedDaysData)}
//     </div>
//   );
// }

// Popup.propTypes = {
//   onClose: PropTypes.func.isRequired,
//   isVisible: PropTypes.bool.isRequired,
// };

// //new test
// export default Popup;




import React, { useRef } from "react";
import PropTypes from "prop-types";
import "./Popup.css";
import { API_KEY } from "../src/API";
import { getLocationFromLS } from "../src/functions/location";

function getWeather(selectedDaysData, selectedIndex) {

  // Return early if selectedDaysData is falsy
  if (!selectedDaysData) {
    return null;
  }
  // const lat = 51.9167; // Replace with your desired latitude rn its mile end
  // const lon = 0.9; // Replace with your desired longitude rn its mile end
  const locationString = getLocationFromLS();
  const location = JSON.parse(locationString); // Parse the string back into an object
  const lat = location.lat;
  const lon = location.lon;
 
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const weatherData = data.list[selectedIndex].main;
      document.getElementById("weather").innerHTML = (
        weatherData.temp
      ).toFixed(1);
      document.getElementById("humidity").innerHTML = weatherData.humidity;
    })
    .catch((err) => console.log(err));

  var currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + selectedIndex);
        //creates new date object
  const today = new Date();
        //creates new date object containing date and time
  const dayToday =
    currentDate.toDateString() === today.toDateString();
  const dayLabel = dayToday
    ? "Today"
    : currentDate.toLocaleDateString("en-US", { weekday: "long" });
  // Return JSX
  return (
    <div>
      {dayLabel}
      <br />
      <br />
      Temperature: <span id="weather"></span>°C
      <br />
      Humidity: <span id="humidity"></span>%
    </div>
  );
}

function Popup({ onClose, isVisible, selectedDaysData, selectedIndex }) {
  return (
    <div className={`popup ${isVisible ? "visible" : ""}`}>
      <button onClick={onClose} className="close">
        Close
      </button>
      {selectedDaysData && getWeather(selectedDaysData, selectedIndex)}
    </div>
  );
}

Popup.propTypes = {
  onClose: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
};

//new test
export default Popup;