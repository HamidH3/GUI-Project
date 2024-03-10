import React from "react";
import "./Home.css";
import TopSection from "../components/TopSection";
import MidSection from "../components/MidSection";
import BottomSection from "../components/BottomSection";
// import Battery from "../components/battery";
// import Time from "../components/time";

const Home = () => {
  return (
    <div className="Home">
      
        <TopSection />

        <MidSection />

        <BottomSection />
      
    </div>
  );
};

export default Home;
