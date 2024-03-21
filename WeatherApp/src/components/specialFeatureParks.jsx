import React, { useState, useEffect } from "react";
import "./specialFeatureParks.css";
import { getLocationFromLS, setLocationInLS } from "../functions/location";
import { API_KEY } from "../API";

const SpecialFeatureParks = ({ location }) => {
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();

  // useEffect for initial location setup
  useEffect(() => {
    // Ensure location is valid before proceeding
    if (location == null) {
      location = "Mile End, GB"; // Provide a default location
    }

    if (!location) {
      return; // Exit function early if location is still not valid
    }

    const GEO_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${API_KEY}`;

    fetch(GEO_URL)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          // Assuming valid data format, extract latitude and longitude
          setLat(data[0].lat);
          setLon(data[0].lon);
        }
      });
  }, [location]); // Re-run the effect when the 'location' prop changes

  // States to manage park data and loading state
  const [parks, setParks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch and filter parks 
  const findParks = async () => {
    if (!lat || !lon) {
      setError("Location data is not available"); 
      return; // Halt search if coordinates are missing
    }

    setParks([]); // Reset parks state on new search
    setIsLoading(true); 
    setError(null); 

    try {
      const parks = await findParksNearCoordinates(lat, lon);
      setParks(parks);
      setIsLoading(false); 
    } catch (error) {
      console.error("Error fetching park data:", error);
      setError("An error occurred while fetching park data");
      setIsLoading(false); 
    }
  };

  // Function to query Overpass API for parks based on coordinates
  const findParksNearCoordinates = async (latitude, longitude) => {
    const boundingBoxSize = 500; // Search radius in meters

    // Overpass QL query
    const overpassQuery = `[out:json][timeout:25];
      (
        way["leisure"="park"](around:${boundingBoxSize}, ${latitude}, ${longitude});
      );
      out body;
      >;
      out skel qt;`;

    const overpassEndpoint = "https://overpass-api.de/api/interpreter";
    const encodedQuery = encodeURIComponent(overpassQuery);

    try {
      const response = await fetch(`${overpassEndpoint}?data=${encodedQuery}`);
      if (!response.ok) {
        throw new Error(`Overpass API request failed: ${response.status}`);
      }

      const data = await response.json();
      console.log("data returned:", data.elements);

      // Filter and map Overpass results
      return data.elements.filter((element) => {
        return element.type === "way" && element.tags && element.tags.name; 
      }).map((element) => {
        return {
          name: element.tags.name,
          lat: element.lat, 
          lon: element.lon, 
          type: element.type, 
        };
      });
    } catch (error) {
      console.error("Error fetching park data:", error);
      throw error; // Rethrow to be handled in 'findParks'
    }
  };
    return (
        <div className="button-container">
            <button className="parkButton" onClick={findParks}>Find Nearby Parks</button>
            {error && <p className="error">{error}</p>}
            {isLoading && <p>Loading park data...</p>}
            {parks.length > 0 ? (
                <div> 
                    {[...new Set(parks.map(park => park.name))].map(name => {
                         const parkData = parks.find(park => park.name === name);
                         return (
                            <div key={name}>
                                {name}
                            </div>
                         );
                    })}
                </div>
            ) : (!isLoading && <p>No parks found nearby.</p>)}
        </div>
    );
};

export default SpecialFeatureParks;
