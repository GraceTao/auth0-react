import React, { useState, useEffect } from 'react';
import { Box, FormHelperText, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs'; // Import dayjs

export default function DateFilter({ filters, setFilters }) {
   // Initialize startDate as 30 days ago using dayjs
   const [startDate, setStartDate] = useState(dayjs(filters['start_date'])); 
   const [endDate, setEndDate] = useState(dayjs(filters['end_date']));
   const [error, setError] = useState('');
   const [startDateOpen, setStartDateOpen] = useState(false); // Open state for start date calendar
   const [endDateOpen, setEndDateOpen] = useState(false); // Open state for end date calendar

   const handleStartDateChange = (date) => {
      console.log(date);
      setStartDate(date);
      // Reset end date if it's earlier than the new start date
      if (endDate && endDate.isBefore(startDate)) {
         setError('Start date must be less than or equal to end date.');
         setStartDate(null); // Clear end date if invalid
      } else {
         setError('');
      }

      setFilters((prevFilters) => (
         { ...prevFilters, start_date: date.startOf('day').format("YYYY-MM-DDTHH:mm:ss.SSS") }
      ));
   };

   const handleEndDateChange = (date) => {
      setEndDate(date);
      setError('');
      setFilters((prevFilters) => (
         { ...prevFilters, end_date: date.endOf('day').format("YYYY-MM-DDTHH:mm:ss.SSS") }
      ));
   };

   return (
      <Box display="flex" flexDirection="column" justifyContent="flex-start">
         <LocalizationProvider dateAdapter={AdapterDayjs}>
            {/* Start Date Picker */}
            <DatePicker
               label="Start Date"
               value={startDate}  // Pass dayjs object for start date
               onChange={handleStartDateChange}
               open={startDateOpen} // Show calendar when input is clicked
               onOpen={() => setStartDateOpen(true)} // Open calendar when clicked
               onClose={() => setStartDateOpen(false)} // Close calendar when clicked outside
               minDate={dayjs('1900-01-01')} // Optional: Set a minimum date
               renderInput={(params) => <TextField {...params} fullWidth />}
               sx={{mb: 2}}
            />

            {/* End Date Picker */}
            <DatePicker
               label="End Date"
               value={endDate}  // Pass dayjs object for end date
               onChange={handleEndDateChange}
               open={endDateOpen} // Show calendar when input is clicked
               onOpen={() => setEndDateOpen(true)} // Open calendar when clicked
               onClose={() => setEndDateOpen(false)} // Close calendar when clicked outside
               minDate={startDate} // Ensure end date is >= start date
               renderInput={(params) => <TextField {...params} fullWidth />}
            />

            {/* Error message */}
            {error && <FormHelperText error>{error}</FormHelperText>}
         </LocalizationProvider>
      </Box>
   );
}
