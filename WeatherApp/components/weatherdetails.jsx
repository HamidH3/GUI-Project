import React from "react";
import "./weatherdetails.css";

const Weatherdetails = () => {
  return (
    <div className="details-container">
      <h3>weather details</h3>
      <Link to="/today">
        <button className="weather-info">
          <span>Today</span>
          {/* <span>
            <img src="humidity_icon.png" alt="humidity" /> 50%
          </span>
          <span>
            <img src="sunshine_icon.png" alt="sunshine" /> 15°C
          </span> */}
        </button>
      </Link>
      <Link to="/Tuesday">
        <button className="weather-info">
          <span>Today</span>
          {/* <span>
            <img src="humidity_icon.png" alt="humidity" /> 50%
          </span>
          <span>
            <img src="sunshine_icon.png" alt="sunshine" /> 14°C
          </span> */}
        </button>
      </Link>
      <Link to="/Wednesday">
        <button className="weather-info">
          <span>Today</span>
          {/* <span>
            <img src="humidity_icon.png" alt="humidity" /> 50%
          </span>
          <span>
            <img src="sunshine_icon.png" alt="sunshine" /> 25°C
          </span> */}
        </button>
      </Link>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam eaque
        repudiandae nostrum ratione. Nemo laborum accusantium porro at enim,
        quam magnam fugiat vero natus, itaque quaerat, pariatur obcaecati!
        Doloribus, consectetur!
      </p>
    </div>
  );
};

Weatherdetails.propTypes = {};

export default Weatherdetails;
