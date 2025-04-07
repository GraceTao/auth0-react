import React, { useState, useEffect, useRef } from "react";
import { Box, Slider, IconButton } from "@mui/material";
import {
   PlayArrow,
   Pause,
   NavigateBefore,
   NavigateNext,
} from "@mui/icons-material";

const ImageCarousel = ({ images }) => {
   const [currentIndex, setCurrentIndex] = useState(0);
   const [isPlaying, setIsPlaying] = useState(true);
   const [slideDuration, setSlideDuration] = useState(500); // 0.5 seconds
   const intervalRef = useRef(null);
   const imageCache = useRef({});

   // Preload images
   useEffect(() => {
      // Preload next few images
      const preloadCount = 3; // How many images ahead to preload
      for (let i = 1; i <= preloadCount; i++) {
         const img = new Image();
         img.src = images[(currentIndex + i) % images.length].url;
      }
   }, [currentIndex, images]);

   // Handle auto-play
   useEffect(() => {
      if (isPlaying) {
         intervalRef.current = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
         }, slideDuration);
      } else if (intervalRef.current) {
         clearInterval(intervalRef.current);
      }

      return () => {
         if (intervalRef.current) clearInterval(intervalRef.current);
      };
   }, [isPlaying, images.length, slideDuration]);

   const handleSliderChange = (event, newValue) => {
      if (typeof newValue === "number") {
         setCurrentIndex(newValue);
         // Pause auto-play when user interacts
         setIsPlaying(false);
      }
   };

   const goToPrev = () => {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      setIsPlaying(false);
   };

   const goToNext = () => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
      setIsPlaying(false);
   };

   const togglePlay = () => {
      setIsPlaying((prev) => !prev);
   };

   return (
      <Box sx={{ maxWidth: "100%", mx: "auto", position: "relative" }}>
         {/* Current Image Display */}
         <Box
            component="img"
            src={images[currentIndex]?.url}
            alt={images[currentIndex]?.name}
            sx={{
               width: "100%",
               height: "auto",
               maxHeight: "70vh",
               objectFit: "contain",
               display: "block",
               mb: 2,
            }}
            onLoad={() => {
               imageCache.current[images[currentIndex].url] = true;
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
            <IconButton onClick={goToPrev} size="large">
               <NavigateBefore />
            </IconButton>

            <IconButton onClick={togglePlay} size="large">
               {isPlaying ? <Pause /> : <PlayArrow />}
            </IconButton>

            <IconButton onClick={goToNext} size="large">
               <NavigateNext />
            </IconButton>
         </Box>

         {/* Slider */}
         <Box sx={{ width: "90%", mx: "auto", mt: 2 }}>
            <Slider
               value={currentIndex}
               onChange={handleSliderChange}
               min={0}
               max={images.length - 1}
               step={1}
               // valueLabelDisplay="auto"
               // valueLabelFormat={(value) => `Image ${value + 1}`}
               sx={{
                  "& .MuiSlider-thumb": {
                     transition: "left 0.1s ease-out",
                  },
               }}
            />
         </Box>

         {/* Speed Control */}
         <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
            <Slider
               value={slideDuration}
               onChange={(e, newValue) => setSlideDuration(newValue)}
               min={100}
               max={2000}
               step={100}
               valueLabelDisplay="auto"
               valueLabelFormat={(value) => `${value}ms`}
               sx={{ width: "200px" }}
            />
         </Box>
      </Box>
   );
};

export default ImageCarousel;
