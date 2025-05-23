// components/Loader.jsx
import React from 'react';
// import './Loader.css'; // Add your styles
import imgURL from "../../assets/MovieProduction.gif"

const Loader = () => {

  return (
    <div className="loader-container">
      {/* <div className="loader"></div> */}
      <img src={imgURL} alt="Loading..." />
    </div>
  );
};

export default Loader;