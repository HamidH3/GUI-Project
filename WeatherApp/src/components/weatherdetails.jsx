
// import React, { useState, useEffect } from "react";
// import "./weatherdetails.css";
// import { getLocationFromLS } from "../functions/location";
// import {API_KEY} from "../API";

// const Weatherdetails = () => {
//   const [temp, setTemp] = useState(''); 
//   const [humidity, setHumidity] = useState('');
//   const [tempMin, setTempMin] = useState('');
//   const [tempMax, setTempMax] = useState('');
//   const [pressure, setPressure] = useState('');
//   const [wind, setWind] = useState('');
//   const [loading, setLoading] = useState(true);
//   const[geoInfo, setGeoInfo] = useState();

//   useEffect(() => {
//     const fetchWeatherData = async () => {
//       try {
//         const locationString = getLocationFromLS();
//        const GEO_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${locationString}&limit=1&appid=${API_KEY}`;

//        fetch(GEO_URL)
//          .then((res) => res.json())
//          .then((data) => {
//            data = data[0];

//            setGeoInfo(data);
//              const lat = geoInfo.lat;
//              const lon = geoInfo.lon;

//              const apiUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&appid=28e0bac8d6e2712922db61d4a21b1902&units=metric`;
//          fetch(apiUrl)
//           .then((response)=>{
//             if (!response.ok) {
//             throw new Error("Error fetching weather data");
//             }
          
//           return response.json();
        
//             })
//             .then((data) => {
//               const currentDate = new Date().toISOString().split("T")[0];

//         const weatherData = data.list[0];

//         setTemp((weatherData.temp.day).toFixed(0))
//         setHumidity(weatherData.humidity)
//         setTempMin((weatherData.temp.min).toFixed(0))
//         setTempMax((weatherData.temp.max).toFixed(0))
//         setPressure(weatherData.pressure)
//         setWind((weatherData.speed).toFixed(0))

//         setLoading(false);

//             })
//                .catch((error) => {
//                 console.error("Error fetching weather data:", error);
//                 setLoading(false);
//               });
//             });

//       } catch (error) {
//         console.error("Error fetching weather data:", error);
//         setLoading(false);
//       }
//     };
//     fetchWeatherData();
//   }, []);

//   return (
//     <div className="details-container">
//       <h3>Weather Details</h3>
//       {loading && <p>Loading...</p>}
//       {!loading && (
//         <>
//         <p>Temperature: <span>{temp}</span>°C</p>
//         <p>Humidity: <span>{humidity}</span>%</p>
//         <p>Min Temperature: <span>{tempMin}</span>°C</p>
//         <p>Max Temperature: <span>{tempMax}</span>°C</p>
//         <p>Average Pressure: <span>{pressure}</span> mbar</p>
//         <p>Wind: <span>{wind}</span> mph</p>
//         </>
//       )}
//     </div>
//   );
// };

// export default Weatherdetails;



import React, { useState, useEffect } from "react";
import "./weatherdetails.css";
import { getLocationFromLS } from "../functions/location";
import { API_KEY } from "../API";

const Weatherdetails = () => {
  const [temp, setTemp] = useState("");
  const [humidity, setHumidity] = useState("");
  const [tempMin, setTempMin] = useState("");
  const [tempMax, setTempMax] = useState("");
  const [pressure, setPressure] = useState("");
  const [wind, setWind] = useState("");
  const [loading, setLoading] = useState(true);
  const [geoInfo, setGeoInfo] = useState();

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const locationString = getLocationFromLS();
        const GEO_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${locationString}&limit=1&appid=${API_KEY}`;

        const geoResponse = await fetch(GEO_URL);
        if (!geoResponse.ok) {
          throw new Error("Error fetching location data");
        }
        const geoData = await geoResponse.json();
        const geoInfo = geoData[0];
        setGeoInfo(geoInfo);

        const lat = geoInfo.lat;
        const lon = geoInfo.lon;

        const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

        const weatherResponse = await fetch(weatherUrl);
        if (!weatherResponse.ok) {
          throw new Error("Error fetching weather data");
        }
        const weatherData = await weatherResponse.json();

        const currentDate = new Date().toISOString().split("T")[0];
        const weatherToday = weatherData.list[0];

        setTemp(weatherToday.temp.day.toFixed(0));
        setHumidity(weatherToday.humidity);
        setTempMin(weatherToday.temp.min.toFixed(0));
        setTempMax(weatherToday.temp.max.toFixed(0));
        setPressure(weatherToday.pressure);
        setWind(weatherToday.speed.toFixed(0));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <div className="details-container">
      <h3>Weather Details</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p>
            Temperature: <span>{temp}</span>°C
          </p>
          <p>
            Humidity: <span>{humidity}</span>%
          </p>
          <p>
            Min Temperature: <span>{tempMin}</span>°C
          </p>
          <p>
            Max Temperature: <span>{tempMax}</span>°C
          </p>
          <p>
            Average Pressure: <span>{pressure}</span> mbar
          </p>
          <p>
            Wind: <span>{wind}</span> mph
          </p>
        </>
      )}
    </div>
  );
};

export default Weatherdetails;