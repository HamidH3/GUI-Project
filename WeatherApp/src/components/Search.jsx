import "./Search.css";
import React, { useState, useEffect, useRef } from "react";
import { CURRENT_WEATHER_URL, API_KEY } from "../API";

const Search = ( {onLocationChange} ) => {
    const [location, setLocation] = useState();
    const [searchInput, setSearchInput] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const searchRef = useRef(null); // Reference to the input field
    const [searchedValue, setSearchedValue] = useState(null); // State to store the last clicked suggestion

    useEffect(() => {
        // Hide search if the user clicks outside of the search area
        const handleClickOutside = (event) => {
          if (searchRef.current && !searchRef.current.contains(event.target)) {
            setShowSearch(false);
          }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
      }, []);
    
      useEffect(() => {
        if (searchInput.length > 2) {
          const GEO_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${searchInput}&limit=5&appid=${API_KEY}`;
          fetch(GEO_URL)
            .then((response) => response.json())
            .then((data) => {
              // Filter for unique suggestions
              const uniqueSuggestions = data.filter((item, index, self) => {
                const label = `${item.name}, ${item.country}${item.state ? `, ${item.state}` : ""
                  }`;
                return (
                  index ===
                  self.findIndex((s) => {
                    const sLabel = `${s.name}, ${s.country}${s.state ? `, ${s.state}` : ""
                      }`;
                    return sLabel === label;
                  })
                );
              });
              setSuggestions(
                data.map((item) => {
                  // Construct the display label
                  let label = `${item.name}, ${item.country}`;
                  if (item.state) {
                    label += `, ${item.state}`;
                  }
                  return label;
                })
              );
            })
            .catch(() => setSuggestions([]));
        } else {
          setSuggestions([]);
        }
      }, [searchInput]);

    const handleSearchClick = () => {
        setShowSearch(!showSearch);
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchInput(suggestion);
        setLocation(suggestion);
        setSearchedValue(suggestion); // Update searchedValue
        setShowSearch(false);
        onLocationChange(suggestion);
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
          <div className="content">
            <searchLocation onLocationChange = {setLocation} />
          </div>
        </div>
      );
};

export default Search;