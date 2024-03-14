import React, { useState, useEffect } from "react";
import "./TopSection.css";
import { CURRENT_WEATHER_URL, API_KEY } from "../API";
import { getLocationFromLS, setLocationInLS } from "../functions/location";

const SearchBar = ({ onLocationChange }) => {
  const [searchInput, setSearchInput] = useState("");
  const [locationData, setLocationData] = useState();

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  const searchLocation = (event) => {
    const GEO_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${searchInput}&limit=1&appid=${API_KEY}`;

    if (event.key === "Enter") {
      fetch(`${GEO_URL}`)
        .then((response) => response.json())
        .then((response) => {
          setLocationData(response);
        });
    }
  };

  useEffect(() => {
    onLocationChange(searchInput);
  }, [locationData]);

  return (
    <div className="searchBar">
      <input
        type="text"
        placeholder="Enter a location"
        value={searchInput}
        onChange={handleSearchChange}
        onKeyPress={searchLocation}
      />
    </div>
  );
};

const TopSection = ({ location, temperature }) => {
  return (
    <div className="topSec">
      <p>{location}</p>
      <p>{temperature}</p>
    </div>
  );
};

const WeatherApp = () => {
  const [location, setLocation] = useState();
  const [temperature, setTemperature] = useState(null);

  useEffect(() => {
    if (location) {
      const GEO_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${API_KEY}`;

      fetch(GEO_URL)
        .then((response) => response.json())
        .then((data) => {
          const lat = data[0].lat;
          const lon = data[0].lon;
          const weatherURL = `${CURRENT_WEATHER_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
          setLocationInLS(lat, lon);
          return fetch(weatherURL);
        })
        .then((response) => response.json())
        .then((weatherData) => {
          setTemperature(weatherData.main.temp); //gets the temp for that location
        })
        .catch(() => {
          setLocation("Could not find location")
          (setTemperature(null));
        });
    }
  }, [location]);

  return (
    <div>
      <SearchBar onLocationChange={setLocation} />
      <TopSection location={location} temperature={temperature} />
    </div>
  );
};

export default WeatherApp;











//THIS IS DROP DOWN MENU ONE

// import React, { useState, useEffect } from "react";
// import "./TopSection.css";
// import { API_KEY } from "../API";
// import { setLocationInLS } from "../functions/location";

// const SearchBar = ({ onLocationChange }) => {
//   const [selectedLocation, setSelectedLocation] = useState("");
//   const [locations, setLocations] = useState([]);

//   useEffect(() => {
//     // Fetch cities from the API
//     const fetchCities = async () => {
//       const response = await fetch(
//         `http://api.openweathermap.org/geo/1.0/direct?limit=10&appid=${API_KEY}`
//       );
//       const data = await response.json();
//       setLocations(data);
//     };

//     fetchCities();
//   }, []);

//   const handleLocationChange = (event) => {
//     setSelectedLocation(event.target.value);
//   };

//   const handleSelectLocation = () => {
//     onLocationChange(selectedLocation);
//   };

//   return (
//     <div className="searchBar">
//       <select value={selectedLocation} onChange={handleLocationChange}>
//         <option value="">Select a location...</option>
//         {Array.isArray(locations) &&
//           locations.map((location) => (
//             <option key={location.name} value={location.name}>
//               {location.name}
//             </option>
//           ))}
//       </select>
//       <button onClick={handleSelectLocation}>Select</button>
//     </div>
//   );
// };

// const TopSection = ({ location, temperature }) => {
//   return (
//     <div className="topSec">
//       <p>{location}</p>
//       <p>{temperature}</p>
//     </div>
//   );
// };

// const WeatherApp = () => {
//   const [location, setLocation] = useState();
//   const [temperature, setTemperature] = useState(null);

//   useEffect(() => {
//     if (location) {
//       const GEO_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${API_KEY}`;

//       fetch(GEO_URL)
//         .then((response) => response.json())
//         .then((data) => {
//           const lat = data[0].lat;
//           const lon = data[0].lon;
//           const weatherURL = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
//           setLocationInLS(lat, lon);
//           return fetch(weatherURL);
//         })
//         .then((response) => response.json())
//         .then((weatherData) => {
//           setTemperature(weatherData.main.temp); //gets the temp for that location
//         })
//         .catch(() => {
//           setLocation("Could not find location");
//           setTemperature(null);
//         });
//     }
//   }, [location]);

//   return (
//     <div>
//       <SearchBar onLocationChange={setLocation} />
//       <TopSection location={location} temperature={temperature} />
//     </div>
//   );
// };

// export default WeatherApp;