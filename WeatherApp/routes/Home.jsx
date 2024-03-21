import React, { useState } from "react";
import "./Home.css";
import TopSection from "../src/components/TopSection";
import MidSection from "../src/components/MidSection";
import BottomSection from "../src/components/BottomSection";
import Search from "../src/components/Search"


const Home = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  // gets location from search component to be passed as a prop into other components
  const handleLocationChange = (location) => {
    console.log("loc",location);
    setSelectedLocation(location);
  };

  return (
    <div className="Home">
     
      <Search onLocationChange = {handleLocationChange}/>

      <TopSection location = {selectedLocation}/>

      <MidSection location = {selectedLocation}/>

      <BottomSection location = {selectedLocation}/>
    </div>
  );
};

export default Home;
