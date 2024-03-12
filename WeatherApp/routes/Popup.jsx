import React, { useRef } from "react";
import PropTypes from "prop-types";
import "./Popup.css";

function Popup({ onClose, isVisible, selectedDaysData }) {
  // const { date, label, precipitation, maxTemp } = selectedDaysData;

  return (
    <div className={`popup ${isVisible ? "visible" : ""}`}>
      {/* <h1>Information for {label}</h1>
      <p>Date: {date}</p>
      <p>Precipitation: {precipitation}</p>
      <p>Max Temp: {maxTemp}</p> */}

      <button onClick={onClose} className="close">
        Close
      </button>
    </div>
  );
}

Popup.propTypes = {
  onClose: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
//   selectedDaysData: PropTypes.shape({
//     date: PropTypes.string.isRequired,
//     label: PropTypes.string.isRequired,
//     precipitation: PropTypes.number.isRequired,
//     maxTemp: PropTypes.number.isRequired,
//   }).isRequired,
};

export default Popup;
