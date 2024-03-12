import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TopSection.css';

const SearchBar = ({ onLocationChange }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  useEffect(() => {
    onLocationChange(searchInput);
  }, [searchInput]);

  return (
    <div className="searchBar"> 
      <input type="text" placeholder="Enter a location" value={searchInput} onChange={handleSearchChange} />
    </div>
  );
};

const TopSection = ({ location}) => { 

  return (
    <div className="topSec">
      <p>{location}</p>
    </div>
  );
};

const WeatherApp = () => {
  const [location, setLocation] = useState('Mile End');
  const [temperature, setTemperature] = useState(null);

  return (
    <div>
      <SearchBar onLocationChange={setLocation} /> 
      <TopSection location={location} />
    </div>
  );
};

export default WeatherApp; 