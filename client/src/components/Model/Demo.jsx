import { useState, useEffect, useCallback } from "react";
import {
   Box,
   IconButton,
   Typography,
   ToggleButtonGroup,
   ToggleButton,
} from "@mui/material";
import ImageCarousel from "./ImageCarousel";
import CollapsibleNavbar from "../CollapsibleNavbar";
import Info from "../Info";
import ModelInfo from "./ModelInfo";

const BASE_URL = "http://localhost:5000";

export default function Demo() {
   const [images, setImages] = useState({});
   const [loading, setLoading] = useState(true);
   const [selectedTab, setSelectedTab] = useState("base");
   const [error, setError] = useState(null);

   const fetchImages = useCallback(async (tab) => {
      try {
         console.log("Fetching images for:", tab);
         const response = await fetch(
            `${BASE_URL}/api/images/hotspots?folderName=${tab}`
         );
         const res = await response.json();
         setImages((prev) => ({ ...prev, [tab]: res }));
         return res;
      } catch (error) {
         console.error("Error fetching images:", error);
         setError(error.message);
         throw error;
      }
   }, []);

   useEffect(() => {
      if (!images[selectedTab]) {
         setLoading(true);
         fetchImages(selectedTab)
            .finally(() => setLoading(false));
      }
   }, [selectedTab, fetchImages]); // Removed images from dependencies

   if (loading && !images[selectedTab]) {
      return <Typography>Loading {selectedTab} images...</Typography>;
   }

   return (
      <Box
      >
         <CollapsibleNavbar isCollapsed={true} />
         <Box sx={{ flex: 1, position: "relative" }}>
            <Info title="Model Results">
               <ModelInfo />
            </Info>
         </Box>
         <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap="2%"
         >
            <ToggleButtonGroup
               orientation="vertical"
               value={selectedTab}
               exclusive
               onChange={(e, value) => setSelectedTab(value)}
            >
               <ToggleButton value="base">Base</ToggleButton>
               <ToggleButton value="population">Population</ToggleButton>
               <ToggleButton value="race">Race</ToggleButton>
            </ToggleButtonGroup>
            {images[selectedTab] && <ImageCarousel images={images[selectedTab]} />}
         </Box>
      </Box>
   );
}