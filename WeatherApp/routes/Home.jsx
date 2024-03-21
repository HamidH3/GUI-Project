import React, { useState } from "react";
import "./Home.css";
import TopSection from "../src/components/TopSection";
import MidSection from "../src/components/MidSection";
import BottomSection from "../src/components/BottomSection";
import Search from "../src/components/Search"
// import Battery from "../components/battery";
// import Time from "../components/time";

const Home = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  // gets location from search component to be passed as a prop into other components
  const handleLocationChange = (location) => {
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
