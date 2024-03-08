import React from "react";
import TopSection from "../components/TopSection"
import MidSection from "../components/MidSection";
import BottomSection from "../components/BottomSection";

const Home = () => {
  return (
    <div className="Home">
      <TopSection/>
      <MidSection/>
      <BottomSection/>
            
    </div>
  );
};

Home.propTypes = {};

export default Home;
