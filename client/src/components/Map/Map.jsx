import CollapsibleNavbar from "../CollapsibleNavbar";
import CrimeMap from "./CrimeMap";
import Filters from "./Filters";
import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Info from "../Info";

function Map() {
   return (
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
         {/* Navbar at the top */}
         <Box sx={{ display: "flex", flexDirection: "column", minWidth: 250 }}>
            <CollapsibleNavbar />
         </Box>

         <Box
            sx={{
               display: "flex",
               flexDirection: "row",
               flex: 1,
               overflow: "hidden",
            }}
         >
            <Box sx={{ flex: 1, position: "relative" }}>
               <Info>
                  <Typography>
                     The data was taken from the Montgomery County Crime Portal.
                  </Typography>
               </Info>
               <CrimeMap />
            </Box>
         </Box>
      </Box>
   );
}

export default Map;
