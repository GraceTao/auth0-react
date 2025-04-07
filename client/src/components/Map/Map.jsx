import CollapsibleNavbar from "../CollapsibleNavbar";
import CrimeMap from "./CrimeMap";
import Filters from "./Filters";
import { useState } from "react";
import { Box, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

function Map() {
   const [openFilter, setOpenFilter] = useState(false);

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
               
               <CrimeMap />
            </Box>
         </Box>
      </Box>
   );
}

export default Map;
