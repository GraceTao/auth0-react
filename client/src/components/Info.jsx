import {
   Box,
   Dialog,
   DialogTitle,
   Button,
   List,
   ListItem,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { useState } from "react";

export default function Info({ children, right = "5%" }) {
   const [openInfo, setOpenInfo] = useState(false);

   return (
      <Box>
         <Button
            variant="contained"
            onClick={() => setOpenInfo(!openInfo)}
            sx={{
               zIndex: 100,
               position: "absolute",
               top: {
                  xs: "2%", // on extra-small screens
                  sm: "2%",
                  md: "1%", // on medium and up
               },
               right: {
                  xs: "3%",
                  sm: right,
               },
               fontSize: {
                  xs: "0.75rem", // smaller font on phones
                  sm: "0.875rem",
                  md: "1rem",
               },
               padding: {
                  xs: 1,
                  sm: 1.2,
                  md: 1.5,
               },
               borderRadius: 3,
               boxShadow: 3,
               backgroundColor: "primary.dark",
               "&:hover": {
                  boxShadow: 7,
                  backgroundColor: "primary.dark",
               },
            }}
         >
            Learn More
            <InfoIcon sx={{ ml: 2 }} />
         </Button>

         <Dialog onClose={() => setOpenInfo(!openInfo)} open={openInfo}>
            {children}
         </Dialog>
      </Box>
   );
}
