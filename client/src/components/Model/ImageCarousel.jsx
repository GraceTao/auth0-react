import React, { useState, useEffect, useRef } from "react";
import { Box, Slider, IconButton, Typography, Tooltip } from "@mui/material";
import {
   PlayArrow,
   Pause,
   NavigateBefore,
   NavigateNext,
} from "@mui/icons-material";

const ImageCarousel = ({ images }) => {
   const [currentIndex, setCurrentIndex] = useState(0);
   const [isPlaying, setIsPlaying] = useState(true);
   const [slideDuration, setSlideDuration] = useState(1500);
   const [dateRange, setDateRange] = useState([0, images.length - 1]);
   const intervalRef = useRef(null);
   const imageCache = useRef({});

   // Filter images based on date range
   const filteredImages = images.slice(dateRange[0], dateRange[1] + 1);

   // Reset current index when date range changes
   useEffect(() => {
      setCurrentIndex(0);
   }, [dateRange]);

   // Preload images
   useEffect(() => {
      const preloadCount = 5;
      for (let i = 1; i <= preloadCount; i++) {
         const img = new Image();
         img.src =
            filteredImages[(currentIndex + i) % filteredImages.length]?.url;
      }
   }, [currentIndex, filteredImages]);

   // Handle auto-play with filtered images
   useEffect(() => {
      if (isPlaying) {
         intervalRef.current = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % filteredImages.length);
         }, slideDuration);
      } else if (intervalRef.current) {
         clearInterval(intervalRef.current);
      }

      return () => {
         if (intervalRef.current) clearInterval(intervalRef.current);
      };
   }, [isPlaying, filteredImages.length, slideDuration]);

   const handleDateRangeChange = (event, newValue) => {
      setDateRange(newValue);
      setIsPlaying(false);
   };

   const goToPrev = () => {
      setCurrentIndex(
         (prev) => (prev - 1 + filteredImages.length) % filteredImages.length
      );
      setIsPlaying(false);
   };

   const goToNext = () => {
      setCurrentIndex((prev) => (prev + 1) % filteredImages.length);
      setIsPlaying(false);
   };

   const togglePlay = () => {
      setIsPlaying((prev) => !prev);
   };

   return (
      <Box sx={{ maxWidth: "100%", mx: "auto", position: "relative" }}>
         <Typography
            variant="h6"
            sx={{
               position: "absolute",
               top: {
                  sm: "0%",
                  md: "2%",
                  lg: "5%",
               },
               left: {
                  sm: "0%",
                  md: "10%",
                  lg: "20%",
               },
               zIndex: 1,
               backgroundColor: "rgba(0, 0, 0, 0.5)",
               color: "white",
               px: 2,
               py: 1,
               borderRadius: 1,
               fontSize: {
                  xs: "0.875rem",
                  sm: "1rem",
                  md: "1.125rem",
                  lg: "1.2rem",
               },
               fontWeight: 500,
            }}
         >
            Date: {filteredImages[currentIndex]?.name || "Loading..."}
         </Typography>

         {/* Current Image Display */}
         <Box
            component="img"
            src={filteredImages[currentIndex]?.url}
            alt={filteredImages[currentIndex]?.name}
            sx={{
               width: "100%",
               height: "auto",
               maxHeight: {
                  sm: "100vh",
                  md: "90vh",
                  lg: "80vh",
               },
               objectFit: "contain",
               display: "block",
            }}
            onLoad={() => {
               if (filteredImages[currentIndex]?.url) {
                  imageCache.current[filteredImages[currentIndex].url] = true;
               }
            }}
         />

         

         {/* Navigation Controls */}
         <Box
            sx={{
               display: "flex",
               justifyContent: "center",
               alignItems: "center",
               gap: 2,
            }}
         >
            <Tooltip title="Previous" placement="top" arrow>
               <IconButton onClick={goToPrev} size="large">
                  <NavigateBefore />
               </IconButton>
            </Tooltip>
            <Tooltip title={isPlaying ? "Pause" : "Play"} placement="top" arrow>
               <IconButton onClick={togglePlay} size="large">
                  {isPlaying ? <Pause /> : <PlayArrow />}
               </IconButton>
            </Tooltip>
            <Tooltip title="Next" placement="top" arrow>
               <IconButton onClick={goToNext} size="large">
                  <NavigateNext />
               </IconButton>
            </Tooltip>
         </Box>

         {/* Speed Control */}
         <Box
            sx={{
               display: "flex",
               justifyContent: "center",
               gap: 2,
               mt: 1,
               width: "100%",
            }}
         >
            <Typography>Speed</Typography>
            <Slider
               size="small"
               value={slideDuration}
               onChange={(e, newValue) => setSlideDuration(newValue)}
               min={100}
               max={3000}
               step={100}
               valueLabelDisplay="off"
               sx={{
                  width: {
                     xs: "80%",
                     sm: "60%",
                     md: "40%",
                     lg: "20%",
                  },
                  "& .MuiSlider-thumb": {
                     width: 12,
                     height: 12,
                  },
               }}
            />
         </Box>

         {/* Date Range Filter */}
         <Box
            sx={{
               width: {
                  sm: "90%",
                  md: "70%",
                  lg: "50%",
               },
               mx: "auto",
               // mt: 2,
               // p: 2,
               // backgroundColor: "rgba(0,0,0,0.05)",
               // borderRadius: 1,
            }}
         >
            <Typography gutterBottom>Filter Date Range</Typography>
            <Slider
               size="small"
               value={dateRange}
               onChange={handleDateRangeChange}
               min={0}
               max={images.length - 1}
               step={1}
               valueLabelDisplay="auto"
               valueLabelFormat={(value) => images[value].name}
               sx={{
                  "& .MuiSlider-thumb": {
                     transition: "left 0.1s ease-out",
                  },
               }}
            />
         </Box>

         
      </Box>
   );
};

export default ImageCarousel;
