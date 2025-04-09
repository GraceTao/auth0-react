import { Button, Slider } from "@mui/material";
import React, { useState } from "react";

export default function RadiusSlider ({ circle, setRadius, map }) {
   const handleRadiusChange = (e, newRadius) => {
      setRadius(newRadius);

      if (circle) {
         circle.setRadius(newRadius * 1609.34);

         const bounds = new window.google.maps.LatLngBounds();
         const center = circle.getCenter();

         const southwest = {
            lat: center.lat() - newRadius / 69,
            lng: center.lng() - newRadius / 55,
         };
         const northeast = {
            lat: center.lat() + newRadius / 69,
            lng: center.lng() + newRadius / 55,
         };

         bounds.extend(southwest);
         bounds.extend(northeast);
         map.fitBounds(bounds);
      }
   };

   return (
      <Slider
         defaultValue={3}
         valueLabelDisplay="on"
         step={0.5}
         min={0}
         max={50}
         orientation="vertical"
         onChange={handleRadiusChange}
      />
   );
};
