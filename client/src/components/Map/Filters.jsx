import {
   Alert,
   Box,
   Dialog,
   DialogTitle,
   Button,
   List,
   ListItem,
   Snackbar,
} from "@mui/material";
import CrimeTypesFilter from "./Filters/CrimeTypesFilter";
import DateFilter from "./Filters/DateFilter";
import { useState } from "react";
import { useFilters } from "../../context/FiltersContext";
import { useAuth } from "../../context/AuthContext";

export default function Filters({ openFilter, setOpenFilter }) {
   const { currUser } = useAuth();
   const { savePreferences, resetFilters, setApplyFilters } = useFilters();

   const [alert, setAlert] = useState({ open: false, severity: "success", message: "" });

   const handleClose = () => {
      setOpenFilter(false);
      setApplyFilters(true);
   };

   const handleSavePreferences = async () => {
      if (currUser) {
         try {
            await savePreferences(); // Don't forget to CALL the function
            setAlert({
               open: true,
               severity: "success",
               message: "Preferences saved successfully!",
            });
         } catch (error) {
            setAlert({
               open: true,
               severity: "error",
               message: "Failed to save preferences.",
            });
         }
      } else {
         setAlert({
            open: true,
            severity: "error",
            message: "You must be logged in to save preferences.",
         });
      }
   };

   return (
      <Dialog
         onClose={() => setOpenFilter(false)}
         open={openFilter}
         sx={{
            "& .MuiDialog-paper": { padding: "1%", maxWidth: "600px" },
         }}
      >
         <Box display="flex" flexDirection="column" alignItems="center" width="100%">
            <DialogTitle>Filter Crimes (Limit 1000)</DialogTitle>
            <Box display="flex" justifyContent="center" width="100%">
               <CrimeTypesFilter />
               <DateFilter />
            </Box>


      
            <Box display="flex" justifyContent="space-evenly" width="100%" mt={2}>
               <Button onClick={handleSavePreferences}>Save Preferences</Button>
               <Button variant="contained" onClick={handleClose}>
                  Apply
               </Button>
            </Box>
         </Box>

         <Snackbar
            open={alert.open}
            autoHideDuration={3000}
            onClose={() => setAlert({ ...alert, open: false })}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
         >
            <Alert severity={alert.severity} sx={{ width: "100%" }}>
               {alert.message}
            </Alert>
         </Snackbar>
      </Dialog>
   );
}
