import React, { useState, useEffect } from "react";

const Time = () => {
  // State to hold the current time
  const [currentTime, setCurrentTime] = useState(new Date());

  // useEffect hook for updating the time
  useEffect(() => {
    // Create an interval to update the time every second (1000 milliseconds)
    const interval = setInterval(() => {
      setCurrentTime(new Date()); // Update the time state
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(interval); 
  }, []); // Empty dependency array: Execute the effect only once when the component mounts

  return (
    <div className="time">
      {currentTime.toLocaleTimeString([], {
        hour: "2-digit", // Display hours in 24-hour format
        minute: "2-digit", // Display minutes with leading zeros if necessary
      })}
    </div>
  );
};

export default Time;