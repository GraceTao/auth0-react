import Navbar from "./Navbar";
import { useState } from "react";
import { Collapse, IconButton, Box, Tooltip } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

export default function CollapsibleNavbar({
   isCollapsed: initialCollapsed = false,
}) {
   const [isCollapsed, setIsCollapsed] = useState(initialCollapsed);

   const handleCollapse = () => {
      setIsCollapsed((prev) => !prev);
   };

   return (
      <Box>
         <Collapse in={!isCollapsed}>
            <Navbar isCollapsed={isCollapsed} handleCollapse={handleCollapse} />
         </Collapse>

         <IconButton
            onClick={handleCollapse}
            sx={{
               position: "absolute",
               // top: "5%",
               // right: "10%",
               ml: "2%",
               mt: '-1%',
               color: "white",
               backgroundColor: "primary.light",
               zIndex: 1200, // Make sure it's above other elements
               width: {
                  xs: 28,
                  sm: 36,
                  md: 40,
               },
               height: {
                  xs: 28,
                  sm: 36,
                  md: 40,
               },
               "&:hover": {
                  boxShadow: 5,
                  backgroundColor: "primary.light"
               },
            }}
         >
            <Tooltip title={isCollapsed ? "Show" : "Hide"} arrow>
            {isCollapsed ? <ExpandMore /> : <ExpandLess />}
            </Tooltip>
            
         </IconButton>
      </Box>
   );
}
