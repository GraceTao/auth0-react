import CollapsibleNavbar from "../CollapsibleNavbar";
import CrimeMap from "./CrimeMap";
import { Box, Button, Typography, Link } from "@mui/material";
import Info from "../Info";
import MapInfo from "./MapInfo";

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
               <Info title={"Data Source"}>
                  <MapInfo />
               </Info>
               <CrimeMap />
            </Box>
         </Box>
      </Box>
   );
}

export default Map;
