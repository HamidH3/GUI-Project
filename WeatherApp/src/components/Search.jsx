import "./Search.css";
import React, { useState, useEffect, useRef } from "react";
import { CURRENT_WEATHER_URL, API_KEY } from "../API";
import { getLocationFromLS, setLocationInLS } from "../functions/location";

const Search = ({ onLocationChange }) => {
  // States to manage the search component
  const [location, setLocation] = useState(); // Stores the selected location
  const [searchInput, setSearchInput] = useState(""); // Tracks user input in the search bar
  const [showSearch, setShowSearch] = useState(false); // Controls visibility of the search area 
  const [suggestions, setSuggestions] = useState([]); // Stores fetched location suggestions
  const searchRef = useRef(null); // Reference to the search bar for click-outside functionality
  const [searchedValue, setSearchedValue] = useState(null); // Stores the last successfully searched location

  // useEffect for hiding search when clicking outside 
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Only hide if click is outside the searchRef element  
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup function to remove the event listener when the component unmounts
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []); 

  // useEffect for fetching and filtering suggestions
  useEffect(() => {
    // Only fetch if the search input has at least 3 characters 
    if (searchInput.length > 2) {
      const GEO_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${searchInput}&limit=5&appid=${API_KEY}`;

      fetch(GEO_URL)
        .then((response) => response.json())
        .then((data) => {
          // Filter for unique locations (based on name, country, and state)
          const uniqueSuggestions = data.filter((item, index, self) => {
            const label = `${item.name}, ${item.country}${item.state ? `, ${item.state}` : ""}`;
            return index === self.findIndex((s) => { 
              const sLabel = `${s.name}, ${s.country}${s.state ? `, ${s.state}` : ""}`;
              return sLabel === label;
            });
          });

          // Create display labels and store in suggestions state
          setSuggestions(
            uniqueSuggestions.map((item) => {
              let label = `${item.name}, ${item.country}`;
              if (item.state) {
                label += `, ${item.state}`;
              }
              return label;
            })
          );
        })
        .catch(() => setSuggestions([])); // Reset suggestions on fetch error
    } else {
      setSuggestions([]); // Clear suggestions if search input is too short 
    }
  }, [searchInput]); 

  // Handles toggling the search bar visibility
  const handleSearchClick = () => {
    setShowSearch(!showSearch); 
  };

  // Handles when a user clicks on a suggestion
  const handleSuggestionClick = (suggestion) => {
    setSearchInput(suggestion); 
    setLocation(suggestion);  
    setSearchedValue(suggestion); // Update the 'searchedValue' 
    setShowSearch(false); // Hide search bar
    onLocationChange(suggestion); // Pass location change up to parent component
  };
    return (
        <div className="container">
          {" "}
          {/* Main container for layout */}
          <button className="searchButton" onClick={handleSearchClick}>
            {showSearch ? "Hide Search" : "Show Search"}
          </button>
          {showSearch && (
            <div className="searchBar">
              <input
                type="text"
                placeholder="Enter a location"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              {suggestions.length > 0 && (
                <ul className="suggestions">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={suggestion}
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            )}
          {/* <div className="content">
            <searchLocation onLocationChange = {setLocation} />
          </div> */}
        </div>
      );
};

export default Search;