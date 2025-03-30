import { Box, FormGroup, FormControlLabel, Checkbox, FormLabel } from "@mui/material";
import { crimesAgainst } from "./nibrs.js";
import { useState, useEffect } from "react";

export default function CrimeTypesFilter({ setFilters }) {
   // Initialize the checked state based on the length of crimesAgainst
   const [checked, setChecked] = useState(new Array(crimesAgainst.length).fill(false)); 

   const onCheck = (index, label) => {
      setChecked((prevChecked) => {
         const newChecked = [...prevChecked]; // Create a shallow copy of the array
         newChecked[index] = !newChecked[index]; // Toggle the value at the specific index
         return newChecked; // Return the new array to update the state
      });

      // Add or remove the label from the "crimes_against" array in the state
      setFilters((prevFilters) => {
         const updatedCrimes = prevFilters["crimes_against"].includes(label)
            ? prevFilters["crimes_against"].filter(item => item !== label)  // Remove if already checked
            : [...prevFilters["crimes_against"], label]; // Add if not checked

         return { ...prevFilters, crimes_against: updatedCrimes };
      });
   };
   
   // // Optional: If crimesAgainst changes dynamically, update the checked array
   // useEffect(() => {
   //    setChecked(new Array(crimesAgainst.length).fill(false));
   // }, [crimesAgainst]);

   return (
      <Box>
         <FormLabel>Type of Crime</FormLabel>
         <FormGroup>
            {crimesAgainst.map((label, index) => (
               <FormControlLabel
                  key={label}
                  control={<Checkbox onChange={() => onCheck(index, label)} />}
                  label={label}
                  checked={checked[index]} // This controls the checkbox state
               />
            ))}
         </FormGroup>
      </Box>
   );
}
