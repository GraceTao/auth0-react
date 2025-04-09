import { Box, FormGroup, FormControlLabel, Checkbox, FormLabel } from "@mui/material";
import { crimesAgainst } from "./nibrs.js";
import { useFilters } from "../../../context/FiltersContext";

export default function CrimeTypesFilter() {
   const { filters, setFilters } = useFilters();
   
   // Initialize checked state based on current filters
   const isChecked = (label) => filters.crimes_against.includes(label);

   const handleCheck = (label) => {
      setFilters(prevFilters => {
         const currentSelection = prevFilters.crimes_against;
         const updatedSelection = currentSelection.includes(label)
            ? currentSelection.filter(item => item !== label)  // Remove if exists
            : [...currentSelection, label];  // Add if doesn't exist

         return { ...prevFilters, crimes_against: updatedSelection };
      });
   };

   return (
      <Box>
         <FormLabel component="legend">Type of Crime</FormLabel>
         <FormGroup>
            {Object.keys(crimesAgainst).map((label) => (
               <FormControlLabel
                  key={label}
                  control={
                     <Checkbox 
                        checked={isChecked(label)}
                        onChange={() => handleCheck(label)}
                     />
                  }
                  label={label}
               />
            ))}
         </FormGroup>
      </Box>
   );
}