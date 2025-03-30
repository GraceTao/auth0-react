import React, { useEffect, useRef, useState, useCallback } from "react";
import { Button, Paper, Box, Typography } from "@mui/material";
import "./Map.css";
import RadiusSlider from "./RadiusSlider";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Filters from "./Filters";
import dayjs from 'dayjs';

const BASE_URL = "http://localhost:5000";

const CrimeMap = () => {
   const mapRef = useRef(null);
   const [map, setMap] = useState(null);
   const [geojsonMarkers, setGeoJsonMarkers] = useState(null);
   const [marker, setMarker] = useState(null);
   const [circle, setCircle] = useState(null);
   const [radius, setRadius] = useState(3);
   const [scriptLoaded, setScriptLoaded] = useState(false);
   const googleMapsScriptId = "google-maps-script";
   const [filters, setFilters] = useState({
      crimes_against: [],
      crime_categories: [],
      start_date: dayjs().subtract(30, 'day').startOf('day').format("YYYY-MM-DDTHH:mm:ss.SSS"),
      end_date: dayjs().endOf('day').format("YYYY-MM-DDTHH:mm:ss.SSS"),
      police_district: [],
   });
   const [openFilter, setOpenFilter] = useState(false);
   const [applyFilters, setApplyFilters] = useState(false);

   useEffect(() => {
      if (applyFilters && map) {
         displayMarkers(map);
         setApplyFilters(false); // Reset after applying
      }
   }, [applyFilters, map]);

   useEffect(() => {
      const loadGoogleMapsScript = () => {
         // Check if script is already loaded
         if (window.google && window.google.maps) {
            setScriptLoaded(true);
            return;
         }

         // Check if script is already in the DOM
         if (document.getElementById(googleMapsScriptId)) {
            return;
         }

         // Load Google Maps API script with async loading pattern
         const script = document.createElement("script");
         script.id = googleMapsScriptId;
         script.src = `https://maps.googleapis.com/maps/api/js?key=${
            import.meta.env.VITE_GOOGLEMAPS_APIKEY
         }&libraries=places&loading=async&callback=initMap`; // Use callback to ensure it's loaded
         script.async = true;
         script.defer = true;
         document.head.appendChild(script);
      };

      loadGoogleMapsScript();

      // Initialize Google Map only after script is loaded
      window.initMap = () => {
         setScriptLoaded(true);
      };
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
      const infoWindow = new window.google.maps.InfoWindow();

      // convert each filter that's a list to a string
      const formatFilters = (filters) => {
         const formatted = {};
      
         Object.entries(filters).forEach(([key, value]) => {
            if (Array.isArray(value) && value.length > 0) {
               formatted[key] = value.join(",");
            } else if (value) {
               formatted[key] = value; // Keep non-null values
            } else {
               formatted[key] = '';
            }
         });
      
         return new URLSearchParams(formatted);
      };
      

      const params = formatFilters(filters);
      // console.log(`${BASE_URL}/api/crimes/filter?${params}`);
      const res = await fetch(`${BASE_URL}/api/crimes/filter?${params}`);

      if (!res.ok) {
         console.error("Failed to fetch:", res.status, res.statusText);
         const text = await res.text(); // Log the actual response text
         console.error("Response text:", text);
         return;
      }

      const data = await res.json(); // Parse response as JSON
      // console.log(data);
      // remove existing markers, if any
      if (geojsonMarkers) {
         console.log("ESDFHLI");
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
         map.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(input);

         map.addListener("bounds_changed", () => {
            searchBox.setBounds(map.getBounds());
         });

         searchBox.addListener("places_changed", () => {
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

            const newMarker = new window.google.maps.Marker({
               position: places[0].geometry.location,
               map: map,
               icon: {
                  url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
                  scaledSize: new window.google.maps.Size(50, 50),
               },
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
         <Box
            ref={mapRef}
            className="map"
            // sx={{ width: "100%", height: "100%" }}
         />

         <Button
            variant="contained"
            onClick={() => setOpenFilter(!openFilter)}
            sx={{
               position: "absolute",
               top: "1%",
               left: "1%",
               zIndex: 1000,
               padding: 2,
               borderRadius: 3,
               boxShadow: 3,
            }}
         >
            Filter
            <FilterAltIcon sx={{ ml: 2 }} />
         </Button>

         <Filters
            filters={filters}
            setFilters={setFilters}
            openFilter={openFilter}
            setOpenFilter={setOpenFilter}
            setApplyFilters={setApplyFilters}
         />
         
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
