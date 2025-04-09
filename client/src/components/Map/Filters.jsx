import {
   Box,
   Dialog,
   DialogTitle,
   Button,
   List,
   ListItem,
} from "@mui/material";
import CrimeTypesFilter from "./Filters/CrimeTypesFilter";
import DateFilter from "./Filters/DateFilter";
import { useState } from "react";
import { useFilters } from "../../context/FiltersContext";

export default function Filters({ openFilter, setOpenFilter }) {
   const { savePreferences, resetFilters, setApplyFilters } = useFilters();

   const handleClose = () => {
      setOpenFilter(!openFilter);
      setApplyFilters(true);
   };

   return (
      <Dialog onClose={() => setOpenFilter(!openFilter)} open={openFilter} sx={{ 
         "& .MuiDialog-paper": { padding: "1%", maxWidth: "600px" } // Adjusts internal padding and max width
      }}>
         <Box display="flex" flexDirection="column" alignItems="center" width='100%'>
            <DialogTitle>Filter Crimes (Limit 1000)</DialogTitle>
            <Box display="flex" justifyContent="center" width="100%">
               <CrimeTypesFilter />
               <DateFilter />
            </Box>
            <Box display="flex" justifyContent="space-evenly" width='100%'>
               <Button onClick={savePreferences}>Save Preferences</Button>
               <Button variant="contained" onClick={handleClose}>Apply</Button>
            </Box>
         </Box>
      </Dialog>
   );
}
