// components/Loader.jsx
import React from 'react';
import '../../App.css'; // Add your styles
// import imgURL from "../../assets/MovieProduction.gif"

const Loader = () => {

  return (
    <div className="loader-container m-auto">
      <div className="loader"></div>
      {/* <img src={imgURL} alt="Loading..." /> */}
      <p>Loading...</p>
    </div>
  );
};

export default Loader;