import React, { useRef } from "react";
import PropTypes from "prop-types";
import "./Popup.css";

function Popup({ onClose }) {
  return (
    <div className="popup">
      <h1>Information</h1>
      <button onClick={onClose} className="close">
        Close
      </button>
    </div>
  );
}

Popup.propTypes = {};

export default Popup;
