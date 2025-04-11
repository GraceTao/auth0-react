import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  Button, Paper, Box, Typography,
  ToggleButton, ToggleButtonGroup,
  Checkbox, FormControlLabel
} from "@mui/material";
import "./Map.css";
import RadiusSlider from "./RadiusSlider";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Filters from "./Filters";
import { useFilters } from "../../context/FiltersContext";
import dayjs from "dayjs";
import { formatURL } from "../../tools";
import { useAuth } from "../../context/AuthContext";
import FilterListIcon from '@mui/icons-material/FilterList';

// const BASE_URL = "http://localhost:5000";
const BASE_URL = "";

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
   const [mapType, setMapType] = useState('roadmap');
   // Auto-zoom state - controls whether map zooms automatically when radius changes
   const [autoZoomEnabled, setAutoZoomEnabled] = useState(true); // Default is true/checked

   const { filters, applyFilters, setApplyFilters, areFiltersLoading } = useFilters();
   const { currUser } = useAuth();

   const clearMarkers = useCallback(() => {
      if (map && geojsonMarkers) {
         infoWindowRef.current?.close();
         map.data.forEach((feature) => map.data.remove(feature));
         setGeoJsonMarkers(null);
      }
   }, [map, geojsonMarkers]);

   useEffect(() => {
      if (applyFilters && map && !openFilter) {
        console.log("Applying filters");
        displayMarkers(map);
        setApplyFilters(false);
      }
    }, [applyFilters, openFilter, map]);

    useEffect(() => {
      // Only run when:
      // 1. We have a user
      // 2. Map is loaded
      // 3. Filters are not loading
      // 4. We actually have filters
      if (currUser && map && !areFiltersLoading && filters) {
         console.log("Loading saved preferences with filters:", filters);
         displayMarkers(map);
      }
   }, [currUser, map, areFiltersLoading]); 

   // useEffect(() => {
   //    if (currUser && filters && map) {
   //       console.log("good");
   //       displayMarkers(map);
   //       setApplyFilters(false);
   //    }
   // }, [currUser,map]);

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
         mapTypeControl: false,
      };

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
      if (!map) return;
      const featureLayer = map.getFeatureLayer("ADMINISTRATIVE_AREA_LEVEL_2");
      if (!featureLayer) {
          console.warn("Feature layer not available yet for boundary styling.");
          return;
      }
      const boundaryLocation = "ChIJh6O4gzUytokRc2ipdwYZC3g";

      const featureStyleOptions = {
         strokeColor: "#810FCB",
         strokeOpacity: 1.0,
         strokeWeight: 2.0,
         fillColor: "#810FCB",
         fillOpacity: 0.2,
      };

      featureLayer.style = null;

      featureLayer.style = (options) => {
         if (options.feature.placeId === boundaryLocation) {
            return featureStyleOptions;
         }
      };
   };

   const displayMarkers = async (map) => {
      try {
         // Clear existing markers first
         await clearMarkers();

         const params = formatURL(filters);
         const res = await fetch(`${BASE_URL}/api/crimes/filter?${params}`);

         if (!res.ok) throw new Error("Failed to fetch data");

         const data = await res.json();
         const markers = map.data.addGeoJson(data);
         setGeoJsonMarkers(markers);

         // Reattach click listeners
         map.data.addListener("click", (event) => {
            const offense = event.feature.getProperty("Offense_name");
            const nibrs_name = event.feature.getProperty("NIBRS_CrimeName");
            const date = event.feature.getProperty("start_date");
            const time = event.feature.getProperty("start_time");
            const crimeAgainst = event.feature.getProperty("Crime_against");
            const address = event.feature.getProperty("Address");
            const district = event.feature.getProperty("District");
            const place = event.feature.getProperty("Type_of_place");
            const victims = event.feature.getProperty("Number_victims");
         
            const content = `
               <div style="font-family: Arial, sans-serif; max-width: "250px";">
                  <h3 style="margin-top: 0;">${offense || "Unknown Offense"}</h3>
                  <p><a href="https://ucr.fbi.gov/nibrs/2011/resources/nibrs-offense-codes" target="_blank" rel="noopener noreferrer"><strong>NIBRS crime name</strong></a>: ${nibrs_name || "N/A"}</p>
                  <p><strong>Date:</strong> ${date || "N/A"}</p>
                  <p><strong>Time:</strong> ${time || "N/A"}</p>
                  <p><strong>Crime Against:</strong> ${crimeAgainst || "N/A"}</p>
                  <p><strong>Address:</strong> ${address || "N/A"}</p>
                  <p><strong>District:</strong> ${district || "N/A"}</p>
                  <p><strong>Place Type:</strong> ${place || "N/A"}</p>
                  <p><strong>Victims:</strong> ${victims || "N/A"}</p>
               </div>
            `;
         
            infoWindowRef.current.setContent(content);
            infoWindowRef.current.setPosition(event.latLng);
            infoWindowRef.current.open(map);
         });
      } catch (error) {
         console.error("Error displaying markers:", error);
      }
   };

   const setupSearchBox = useCallback(
      (map) => {
         if (!map) return;

         const input = document.createElement("input");
         input.id = "search-bar";
         input.className = "controls";
         input.type = "text";
         input.placeholder = "Enter Location";

         input.style.marginTop = "1rem";
         input.style.padding = '0.5rem 1rem';
         input.style.fontSize = '1rem';
         input.style.height = '2rem';

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
   );

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

   const handleMapTypeChange = (event, newMapType) => {
      if (newMapType !== null && map) {
         setMapType(newMapType);
         map.setMapTypeId(newMapType);
         addBoundary(map);
      }
   };

   // Handler for the auto-zoom checkbox
   const handleAutoZoomChange = (event) => {
      const isChecked = event.target.checked;
      setAutoZoomEnabled(isChecked);
      
      // If user turns off auto-zoom, reset the zoom level to default
      // so they can see the whole county again
      if (!isChecked && circle) {
         map.setZoom(10.5); // Back to default zoom level
      }
   };

   return (
      <Box sx={{ height: "100%", width: "100%", position: 'relative' }}>
         <Box ref={mapRef} className="map" />

         <Box
            sx={{
               position: 'absolute',
               top: '80px',
               left: '10px',
               zIndex: 1,
               display: 'flex',
               flexDirection: 'column',
               gap: 1,
            }}
         >
            <ToggleButtonGroup
               value={mapType}
               exclusive
               onChange={handleMapTypeChange}
               aria-label="map type"
               sx={{
                  backgroundColor: 'white',
                  boxShadow: 1,
                  borderRadius: 1,
                  height: '40px',
               }}
            >
               <ToggleButton
                  value="roadmap"
                  aria-label="roadmap view"
                  sx={{
                     textTransform: 'none',
                     fontWeight: 'bold',
                     color: 'text.primary',
                     '&.Mui-selected': {
                        backgroundColor: 'rgba(0, 0, 0, 0.08)',
                        color: 'text.primary',
                     },
                     '&.Mui-selected:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.12)',
                     },
                     '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                     }
                  }}
               >
                  Map
               </ToggleButton>
               <ToggleButton
                  value="satellite"
                  aria-label="satellite view"
                  sx={{
                     textTransform: 'none',
                     fontWeight: 'bold',
                     color: 'text.primary',
                     '&.Mui-selected': {
                        backgroundColor: 'rgba(0, 0, 0, 0.08)',
                        color: 'text.primary',
                     },
                     '&.Mui-selected:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.12)',
                     },
                     '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                     }
                  }}
               >
                  Satellite
               </ToggleButton>
            </ToggleButtonGroup>

            <Button
               variant="contained"
               startIcon={<FilterListIcon />}
               onClick={() => setOpenFilter(!openFilter)}
               sx={{
                  backgroundColor: 'primary.main',
                  color: 'white',
                  '&:hover': { backgroundColor: 'primary.dark' },
                  height: '40px',
                  boxShadow: 1,
               }}
            >
               Filter
            </Button>

            {/* Auto-zoom checkbox - lets users control whether the map auto-zooms when radius changes */}
            <FormControlLabel
               control={
                  <Checkbox
                     checked={autoZoomEnabled}
                     onChange={handleAutoZoomChange}
                     size="small"
                     sx={{
                        color: 'primary.main',
                        '&.Mui-checked': {
                           color: 'primary.dark',
                        },
                     }}
                  />
               }
               label="Auto focus"
               sx={{
                  backgroundColor: 'white',
                  borderRadius: 1,
                  boxShadow: 1,
                  padding: '0px 8px 0px 4px',
                  margin: 0,
                  height: '36px',
                  '& .MuiTypography-root': {
                     fontSize: '0.875rem',
                     fontWeight: 'bold',
                  }
               }}
            />
         </Box>

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
            {/* Pass the auto-zoom state to RadiusSlider so it knows whether to zoom or not */}
            <RadiusSlider 
               circle={circle} 
               setRadius={setRadius} 
               map={map} 
               autoZoomEnabled={autoZoomEnabled} // This controls the zoom behavior
            />
         </Box>
      </Box>
   );
};

export default CrimeMap;
