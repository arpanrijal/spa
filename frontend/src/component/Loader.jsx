import React from "react";

function Loader() {
  return (
    <div className="loader-container">
      <div className="loader-spinner"></div>
      <div className="loader-text">Loading live market data...</div>
    </div>
  );
}

export default Loader;