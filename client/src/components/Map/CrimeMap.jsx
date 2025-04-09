import React, { useEffect, useRef, useState, useCallback } from "react";
import { Button, Paper, Box, Typography } from "@mui/material";
import "./Map.css";
import RadiusSlider from "./RadiusSlider";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Filters from "./Filters";
import { useFilters } from "../../context/FiltersContext";
import dayjs from "dayjs";

const BASE_URL = "http://localhost:5000";

const CrimeMap = () => {
   const mapRef = useRef(null);
   const infoWindowRef = useRef(null);
   const [map, setMap] = useState(null);
   const [geojsonMarkers, setGeoJsonMarkers] = useState(null);
   const [marker, setMarker] = useState(null);
   const [circle, setCircle] = useState(null);
   const [radius, setRadius] = useState(0);
   const [scriptLoaded, setScriptLoaded] = useState(false);
   const googleMapsScriptId = "google-maps-script";
   const [openFilter, setOpenFilter] = useState(false);

   const { filters, setFilters, applyFilters, setApplyFilters } = useFilters();

   useEffect(() => {
      if (applyFilters && !openFilter && map) {
         displayMarkers(map);
         setApplyFilters(false);
      }
   }, [applyFilters, openFilter, map]);

   useEffect(() => {
      const loadGoogleMapsScript = () => {
         if (window.google && window.google.maps) {
            setScriptLoaded(true);
            return;
         }

         if (document.getElementById(googleMapsScriptId)) return;

         const script = document.createElement("script");
         script.id = googleMapsScriptId;
         script.src = `https://maps.googleapis.com/maps/api/js?key=${
            import.meta.env.VITE_GOOGLEMAPS_APIKEY
         }&libraries=places&loading=async&callback=initMap`;
         script.async = true;
         script.defer = true;
         document.head.appendChild(script);
      };

      loadGoogleMapsScript();
      window.initMap = () => setScriptLoaded(true);
   }, []);

   useEffect(() => {
      if (scriptLoaded && !map && mapRef.current) {
         initMap();
      }
   }, [scriptLoaded, map]);

   const initMap = () => {
      if (!window.google || !window.google.maps || !mapRef.current) return;

      const options = {
         center: { lat: 39.15, lng: -77.2 },
         zoom: 10.5,
         mapId: "838b9a3d29242a9c",
         gestureHandling: "greedy",
      };

      // Ensure the Google Map constructor is available
      const newMap = new window.google.maps.Map(mapRef.current, options);
      setMap(newMap);
      addBoundary(newMap);

      if (!infoWindowRef.current) {
         infoWindowRef.current = new window.google.maps.InfoWindow();
      }

      displayMarkers(newMap);
      setupSearchBox(newMap);
   };

   const addBoundary = (map) => {
      const featureLayer = map.getFeatureLayer("ADMINISTRATIVE_AREA_LEVEL_2");
      const boundaryLocation = "ChIJh6O4gzUytokRc2ipdwYZC3g";

      const featureStyleOptions = {
         strokeColor: "#810FCB",
         strokeOpacity: 1.0,
         strokeWeight: 2.0,
         fillColor: "#810FCB",
         fillOpacity: 0.2,
      };

      featureLayer.style = (options) => {
         if (options.feature.placeId === boundaryLocation) {
            return featureStyleOptions;
         }
      };
   };

   const displayMarkers = async (map) => {
      const infoWindow = infoWindowRef.current;

      // convert each filter that's a list to a string
      const formatFilters = (filters) => {
         const formatted = {};

         Object.entries(filters).forEach(([key, value]) => {
            if (Array.isArray(value) && value.length > 0) {
               formatted[key] = value.join(",");
            } else if (value) {
               formatted[key] = value; // Keep non-null values
            } else {
               formatted[key] = "";
            }
         });

         return new URLSearchParams(formatted);
      };

      const params = formatFilters(filters);
      // console.log(`${BASE_URL}/api/crimes/filter?${params}`);
      // const res = await fetch(`/api/crimes/filter?${params}`);
      const res = await fetch(`${BASE_URL}/api/crimes/filter?${params}`);

      if (!res.ok) {
         console.error("Failed to fetch:", res.status, res.statusText);
         const text = await res.text(); // Log the actual response text
         console.error("Response text:", text);
         return;
      }

      const data = await res.json(); // Parse response as JSON

      // remove existing markers, if any
      if (geojsonMarkers) {
         infoWindow.close();
         for (var i = 0; i < geojsonMarkers.length; i++) {
            map.data.remove(geojsonMarkers[i]);
         }
      }

      const markers = map.data.addGeoJson(data);
      setGeoJsonMarkers(markers);

      map.data.addListener("click", function (event) {
         const feat = event.feature.getProperty("Offense_Name");
         const date = event.feature.getProperty("start_date");
         const crimeAgainst = event.feature.getProperty("Crime_Against");

         infoWindow.setContent(`${date}, ${crimeAgainst}, ${feat}`);
         infoWindow.setPosition(event.latLng);
         infoWindow.setZIndex(2000);
         infoWindow.open(map);
      });
   };

   const setupSearchBox = useCallback(
      (map) => {
         if (!map) return;

         const input = document.createElement("input");
         input.id = "search-bar";
         input.className = "controls";
         input.type = "text";
         input.placeholder = "Enter Location";

         const searchBox = new window.google.maps.places.SearchBox(input);
         map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(
            input
         );

         map.addListener("bounds_changed", () => {
            searchBox.setBounds(map.getBounds());
         });

         searchBox.addListener("places_changed", async () => {
            const places = searchBox.getPlaces();
            if (places.length === 0) return;

            // Use functional updates to get current state
            setMarker((prevMarker) => {
               if (prevMarker) prevMarker.setMap(null);
               return null;
            });
            setCircle((prevCircle) => {
               if (prevCircle) prevCircle.setMap(null);
               return null;
            });

            map.setCenter(places[0].geometry.location);
            map.setZoom(10.5);

            const { AdvancedMarkerElement, PinElement } =
               await google.maps.importLibrary("marker");

            const pin = new PinElement({
               background: "#29bd48",
            });

            const newMarker = new AdvancedMarkerElement({
               position: places[0].geometry.location,
               map: map,
               content: pin.element,
               title: places[0].name,
            });

            const newCircle = new window.google.maps.Circle({
               strokeColor: "#FF0000",
               strokeOpacity: 0.7,
               strokeWeight: 2,
               fillColor: "#FF0000",
               fillOpacity: 0.35,
               map: map,
               center: places[0].geometry.location,
               radius: radius * 1609.34,
            });

            setMarker(newMarker);
            setCircle(newCircle);
         });
      },
      [radius]
   ); // Add dependencies here

   const handleReset = () => {
      if (map) {
         // markers.forEach((marker) => marker.setMap(null));
         // circles.forEach((circle) => circle.setMap(null));
         marker?.setMap(null);
         circle?.setMap(null);

         setMarker(null);
         setCircle(null);

         map.setCenter({ lat: 39.15, lng: -77.2 });
         map.setZoom(10.5);
      }
   };

   return (
      <div className="map-container">
         <Box ref={mapRef} className="map" />

         <Button
            variant="contained"
            onClick={() => setOpenFilter(!openFilter)}
            sx={{
               position: "absolute",
               top: {
                  xs: "2%", // on extra-small screens
                  sm: "2%",
                  md: "1%", // on medium and up
               },
               left: {
                  xs: "5%",
                  sm: "7%",
               },
               fontSize: {
                  xs: "0.75rem", // smaller font on phones
                  sm: "0.875rem",
                  md: "1rem",
               },
               padding: {
                  xs: 1,
                  sm: 1.2,
                  md: 1.5,
               },
               borderRadius: 3,
               boxShadow: 3,
               backgroundColor: "primary.dark",
               "&:hover": {
                  boxShadow: 7,
                  backgroundColor: "primary.dark",
               },
            }}
         >
            Filter
            <FilterAltIcon sx={{ ml: 1 }} />
         </Button>

         {/* Simplified Filters component - no need to pass setApplyFilters */}
         <Filters openFilter={openFilter} setOpenFilter={setOpenFilter} />

         <Box
            sx={{
               position: "absolute",
               top: "15%",
               right: "2%",
               zIndex: 1000,
               backgroundColor: "rgba(255, 255, 255, 0.9)",
               padding: 3,
               borderRadius: 3,
               boxShadow: 3,
               width: "10vw",
               height: "50vh",
               display: "flex",
               flexDirection: "column",
               alignItems: "center",
               justifyContent: "center",
            }}
         >
            <Typography fontWeight="bold">Radius (mi)</Typography>
            <RadiusSlider circle={circle} setRadius={setRadius} map={map} />
         </Box>
      </div>
   );
};

export default CrimeMap;
