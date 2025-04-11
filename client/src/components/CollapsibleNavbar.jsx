import Navbar from "./Navbar";
import { useState } from "react";
import { Collapse, IconButton, Box, Tooltip } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useLocation } from "react-router-dom";

export default function CollapsibleNavbar({
   isCollapsed: initialCollapsed = false,
}) {
   const [isCollapsed, setIsCollapsed] = useState(initialCollapsed);
   const location = useLocation();
   const isAboutPage = location.pathname === "/about" || location.pathname === "/";

   const handleCollapse = () => {
      setIsCollapsed((prev) => !prev);
   };

   return (
      <Box>
         <Collapse in={!isCollapsed || isAboutPage}>
            <Navbar isCollapsed={isCollapsed} handleCollapse={handleCollapse} />
         </Collapse>

         {!isAboutPage && (
           <IconButton
              onClick={handleCollapse}
              sx={{
                 position: "absolute",
                 ml: "3%",
                 mt: '-1%',
                 color: "white",
                 backgroundColor: "primary.light",
                 zIndex: 1200,
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
         )}
      </Box>
   );
}
