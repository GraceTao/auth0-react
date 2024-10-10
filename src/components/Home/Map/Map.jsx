import React, { useEffect } from "react";
import "./style.css";

const MoCoCrimeMap = () => {
  useEffect(() => {
    // Load Google Maps API script
    const loadGoogleMapsScript = () => {
      const script = document.createElement("script");
      script.src =
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyDrGu2gZ1HQ0r1Z930POH1Hi9O6ZctuVd4&libraries=places,visualization&callback=createMap&v=beta";
      script.defer = true;
      document.body.appendChild(script);
    };
    
    loadGoogleMapsScript();

    // Load custom script.js functionality
    const script = document.createElement("script");
    script.src = "script.js";
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup scripts if necessary
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <input
        id="search-bar"
        className="controls"
        type="text"
        placeholder="Enter Location"
      />
      <div id="floating-panel">
        <input id="reset-map-button" type="button" value="Reset map center" />
      </div>
      <label id="change-radius">
        Enter a radius (0-50 miles): <br />
        Default radius: 3 mi<br />
        <input type="number" id="radius" />
        <input id="submit-radius" type="button" value="Submit" />
      </label>
      <label id="custom-radius">
        Radius (mi)
        <div id="range-value">5</div>
        <input
          id="radius-slider"
          type="range"
          className="slider"
          min="0"
          max="50"
          defaultValue="5"
          orient="vertical"
        />
      </label>

      <div className="child inline-block-child" id="markerMap"></div>
      <span style={{ display: "inline-block", width: "640px" }}>
        <h2>Crime Rate Heatmap</h2>
      </span>
      <span style={{ display: "inline-block", width: "640px" }}>
        <h2>Crime Weight Heatmap</h2>
      </span>
      <div className="parent">
        <div className="child inline-block-child" id="crimeRateHeatMap"></div>
        <div className="child inline-block-child" id="crimeWeightHeatMap"></div>
      </div>
      <span style={{ display: "inline-block", width: "640px" }}>
        <h2>Group A Offences Heatmap</h2>
      </span>
      <span style={{ display: "inline-block", width: "640px" }}>
        <h2>Group B Offences Heatmap</h2>
      </span>
      <div className="parent">
        <div className="child inline-block-child" id="groupAMap"></div>
        <div className="child inline-block-child" id="groupBMap"></div>
      </div>
    </div>
  );
};

export default MoCoCrimeMap;
