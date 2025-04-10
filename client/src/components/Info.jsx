import {
   Box,
   Dialog,
   DialogTitle,
   DialogContent,
   DialogActions,
   Button,
   IconButton,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

export default function Info({ children, title }) {
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
                  sm: "5%",
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

         <Dialog
            onClose={() => setOpenInfo(!openInfo)}
            open={openInfo}
            fullScreen
         >
            {/* Outer container that fills the screen and handles scrolling */}
            <Box
               sx={{
                  width: "100vw",
                  height: "100vh",
                  overflowY: "auto", // Scrollbar will be at screen edge
                  display: "flex",
                  justifyContent: "center",
                  backgroundColor: "primary.dark",
               }}
            >
               {/* Your content container with max-width */}
               <Box
                  display="flex"
                  flexDirection="column"
                  width="100%"
                  maxWidth={900}
                  backgroundColor="white"
                  sx={{
                     width: {
                        xs: "95%",
                        sm: "90%",
                        md: "80%",
                     },
                     height: "fit-content", // Let content determine height
                     minHeight: "100%", // But at least full height
                     py: 2,
                     px: 3
                  }}
               >
                  {/* Header with title and close button */}
                  <Box
                     display="flex"
                     justifyContent="space-between"
                     alignItems="center"
                     width="100%"
                  >
                     <DialogTitle
                        sx={{
                           p: 0,
                           fontSize: {
                              xs: "1.2rem",
                              sm: "1.3rem",
                              md: "1.5rem",
                           },
                        }}
                     >
                        {title}
                     </DialogTitle>
                     <IconButton
                        onClick={() => setOpenInfo(!openInfo)}
                        aria-label="close"
                     >
                        <CloseIcon />
                     </IconButton>
                  </Box>

                  {/* Content area - remove overflow handling here */}
                  <DialogContent
                     sx={{
                        flex: 1,
                        p: 0,
                        pt: 2,
                        width: "100%",
                        overflow: "visible", // Important - don't scroll here
                     }}
                  >
                     <Box
                        display="flex"
                        flexDirection="column"
                        gap={2}
                        sx={{
                           fontSize: {
                              xs: "0.875rem",
                              sm: "0.95rem",
                              md: "1rem",
                           },
                           lineHeight: { xs: 1.4, sm: 1.5, md: 1.6 },
                           "& .MuiTypography-root": {
                              fontSize: "inherit",
                              lineHeight: "inherit",
                           },
                        }}
                     >
                        {children}
                     </Box>
                  </DialogContent>
                  <DialogActions>
                     <Button onClick={() => setOpenInfo(!openInfo)} sx={{fontWeight: "bold"}}>
                        close
                     </Button>
                  </DialogActions>
               </Box>
            </Box>
         </Dialog>
      </Box>
   );
}
