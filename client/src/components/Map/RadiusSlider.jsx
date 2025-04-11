import { Button, Slider } from "@mui/material";
import React, { useState } from "react";

export default function RadiusSlider({ circle, setRadius, map, autoZoomEnabled }) {
   const handleRadiusChange = (e, newRadius) => {
      setRadius(newRadius);

      if (circle) {
         // Always update the circle radius regardless of auto-zoom setting
         circle.setRadius(newRadius * 1609.34);

         // Only zoom the map if auto-zoom is enabled
         if (autoZoomEnabled) {
            // This block only runs when the auto-zoom checkbox is checked
            const bounds = new window.google.maps.LatLngBounds();
            const center = circle.getCenter();

            // Calculate bounds based on radius
            const southwest = {
               lat: center.lat() - newRadius / 69,
               lng: center.lng() - newRadius / 55,
            };
            const northeast = {
               lat: center.lat() + newRadius / 69,
               lng: center.lng() + newRadius / 55,
            };

            // Set map bounds to zoom to fit the circle
            bounds.extend(southwest);
            bounds.extend(northeast);
            map.fitBounds(bounds);
            // When auto-zoom is off, we skip all this, so the map stays at its current zoom level
         }
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
