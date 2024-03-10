import React from "react";
import "./background.css";
import backgroundImg from "./images/background.jpeg";

function Background() {
  return (
    <div className="background">
      <img src={backgroundImg} alt="backgroundImg" />
    </div>
  );
}

export default Background;
