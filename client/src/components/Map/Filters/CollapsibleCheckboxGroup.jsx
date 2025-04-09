// CollapsibleCheckboxGroup.js
import { 
   Box, 
   FormGroup, 
   FormControlLabel, 
   Checkbox, 
   FormLabel,
   Collapse,
   IconButton 
 } from "@mui/material";
 import { useState } from "react";
 import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
 import ExpandLessIcon from '@mui/icons-material/ExpandLess';
 
 export default function CollapsibleCheckboxGroup({
   title,
   options,
   selectedValues,
   onSelectionChange,
   defaultExpanded = false
 }) {
   const [expanded, setExpanded] = useState(defaultExpanded);
 
   const handleCheck = (value) => {
     const newSelection = selectedValues.includes(value)
       ? selectedValues.filter(item => item !== value)
       : [...selectedValues, value];
     onSelectionChange(newSelection);
   };
 
   const toggleExpand = () => {
     setExpanded(!expanded);
   };
 
   return (
     <Box>
       <Box 
         sx={{ 
           display: 'flex', 
           alignItems: 'center',
           cursor: 'pointer',
           '&:hover': { 
             '& .MuiFormLabel-root, & .MuiIconButton-root': { color: 'black' } 
           }
         }}
         onClick={toggleExpand}
       >
         {/* Title */}
         <FormLabel
           component="legend"
           sx={{
             transition: 'color 0.2s', // Smooth transition
           }}
         >
           {title}
         </FormLabel>
         
         {/* IconButton */}
         <IconButton 
           size="small" 
           sx={{ 
             ml: 1,
             transition: 'color 0.2s', // Smooth transition
           }}
         >
           {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
         </IconButton>
       </Box>
       
       <Collapse in={expanded}>
         <FormGroup>
           {options.map((option) => (
             <FormControlLabel
               key={option.value}
               control={ 
                 <Checkbox 
                   checked={selectedValues.includes(option.value)}
                   onChange={() => handleCheck(option.value)}
                 />
               }
               label={option.label}
             />
           ))}
         </FormGroup>
       </Collapse>
     </Box>
   );
 }
