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
      {/* <div className="phone-widgets">
          <Time className = "topleft"/>
          <Battery className = "topright" level={50} />
        </div> */}

      {/* <div className="forecasts"> */}
        <TopSection />

        <MidSection />

        <BottomSection />
      </div>
    //  </div>
  );
};

export default Home;
