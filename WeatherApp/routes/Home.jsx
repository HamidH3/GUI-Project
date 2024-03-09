import React from "react";
import "./Home.css";
import TopSection from "../components/TopSection";
import MidSection from "../components/MidSection";
import BottomSection from "../components/BottomSection";
import Battery from "../components/battery";
import Time from "../components/time";

const Home = () => {
  return (
    <div className="Home">
      <div className="phone-screen">
        <div className="phone-widgets">
          <Battery level={50} />
          <Time />
        </div>
        <div className = "">
          <TopSection />
          <MidSection />
          <BottomSection />
        </div>
      </div>
    </div>
  );
};

Home.propTypes = {};

export default Home;
