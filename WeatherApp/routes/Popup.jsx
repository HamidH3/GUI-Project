import React, { useRef } from "react";
import PropTypes from "prop-types";
import "./Popup.css";

function Popup({ onClose, isVisible }) {
  
  return (
    <div className={'popup ${isVisible ? "visible" : ""}'}>
      <h1>Information</h1>
      <button onClick={onClose} className="close">
        Close
      </button>
    </div>
  );
}

Popup.propTypes = {
  onClose: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
};

export default Popup;
