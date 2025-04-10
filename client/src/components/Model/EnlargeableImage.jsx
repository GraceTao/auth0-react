import React, { useState } from "react";
import {
   Dialog,
   DialogActions,
   DialogContent,
   IconButton,
   Box,
   Zoom,
} from "@mui/material";
import ZoomInIcon from '@mui/icons-material/ZoomIn';

export default function EnlargeableImage({ src, alt, zoomedAlt }) {
   const [open, setOpen] = useState(false);

   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);

   return (
      <Box>
         <Box display='flex' justifyContent="center" alignItems="flex-end">
         
         <Box
            component="img"
            src={src}
            alt={alt}
            sx={{
               cursor: "pointer",
               maxWidth: 400,
               width: {
                  xs: "80%",
                  sm: "70%",
                  md: "60%",
               },
            }}
            onClick={handleOpen}
         />
         <IconButton onClick={handleOpen}>
            <ZoomInIcon/>
         </IconButton>
         </Box>
         
         

         <Dialog
            open={open}
            onClose={handleClose}
            fullWidth={true} // Makes dialog stretch horizontally
            maxWidth="lg" // Options: 'xs'|'sm'|'md'|'lg'|'xl'|false
            sx={{
               "& .MuiDialog-paper": {
                  width: "100%", // Ensures paper takes full allowed width
                  maxHeight: "90vh", // Prevents dialog from touching screen edges
               },
            }}
         >
            <Box
               component="img"
               src={src}
               alt={alt}
               sx={{
                  width: "100%",
                  height: "auto",
                  objectFit: "contain",
                  cursor: "pointer",
                  maxHeight: "calc(90vh - 64px)", // Accounts for dialog header/footer
               }}
               onClick={handleOpen}
            />
         </Dialog>
      </Box>
   );
}
