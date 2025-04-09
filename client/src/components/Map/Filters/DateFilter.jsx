import React from 'react';
import { Box, FormHelperText } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs'; 
import { useFilters } from '../../../context/FiltersContext';

export default function DateFilter() {
   const { filters, setFilters } = useFilters();
   const [error, setError] = React.useState('');
   
   // Convert filter strings to dayjs objects
   const startDate = dayjs(filters.start_date);
   const endDate = dayjs(filters.end_date);

   const handleDateChange = (type) => (date) => {
      if (!date || !date.isValid()) return;
      
      if (type === 'start' && date.isAfter(endDate)) {
         setError('Start date must be before end date');
         return;
      }
      
      setError('');
      
      const newDateValue = type === 'start' 
         ? date.startOf('day').format("YYYY-MM-DDTHH:mm:ss.SSS")
         : date.endOf('day').format("YYYY-MM-DDTHH:mm:ss.SSS");
      
      // Log the new value before updating state
      console.log("New date:", newDateValue);
      
      setFilters(prev => ({
         ...prev,
         [type === 'start' ? 'start_date' : 'end_date']: newDateValue
      }));
   };

   return (
      <Box display="flex" flexDirection="column">
         <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
               label="Start Date"
               value={startDate}
               onChange={handleDateChange('start')}
               minDate={dayjs('2016-07-01')}
               maxDate={endDate}
               slotProps={{
                  textField: {
                     variant: 'outlined',
                     fullWidth: true,
                  }
               }}
               sx={{ mb: 2 }}
            />

            <DatePicker
               label="End Date"
               value={endDate}
               onChange={handleDateChange('end')}
               minDate={startDate}
               slotProps={{
                  textField: {
                     variant: 'outlined',
                     fullWidth: true,
                  }
               }}
            />

            {error && <FormHelperText error>{error}</FormHelperText>}
         </LocalizationProvider>
      </Box>
   );
}