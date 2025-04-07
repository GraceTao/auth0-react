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

export default function Filters(props) {
   const { filters, setFilters, openFilter, setOpenFilter, setApplyFilters } = props;


   const handleClose = () => {
      setOpenFilter(!openFilter);
   };

   const applyFilters = () => {
      setApplyFilters(true);
      setOpenFilter(!openFilter);
   }

   return (
      <Dialog onClose={handleClose} open={openFilter} sx={{ 
         "& .MuiDialog-paper": { padding: "1%", maxWidth: "600px" } // Adjusts internal padding and max width
      }}>
         <Box display="flex" flexDirection="column" alignItems="center" width='100%'>
            <DialogTitle>Filter Crimes</DialogTitle>
            <Box display="flex" justifyContent="center" width="100%">
               <CrimeTypesFilter setFilters={setFilters} />
               <DateFilter filters={filters} setFilters={setFilters} />
            </Box>
            <Box display="flex" justifyContent="space-evenly" width='100%'>
               <Button>Save Preferences</Button>
               <Button variant="contained" onClick={applyFilters}>Apply</Button>
            </Box>
         </Box>
      </Dialog>
   );
}
