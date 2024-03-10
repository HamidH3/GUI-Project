import React from "react";
import "./Home.css";
import TopSection from "../src/components/TopSection";
import MidSection from "../src/components/MidSection";
import BottomSection from "../src/components/BottomSection";
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
