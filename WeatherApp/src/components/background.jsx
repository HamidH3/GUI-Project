import React from "react";
import "./background.css"; // Import the CSS file for styling

function Background() {
  return (
    <div className="background">  
      {/* Container for the background image*/}
      <img src="./images/background.png" alt="backgroundImg" /> 
    </div>
  );
}

export default Background;