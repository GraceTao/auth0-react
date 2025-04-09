// convert each filter that's a list to a string
export const formatURL = (filters) => {
   const formatted = {};

   Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
         formatted[key] = value.join(",");
      } else if (value) {
         formatted[key] = value; // Keep non-null values
      } else {
         formatted[key] = "";
      }
   });

   return new URLSearchParams(formatted);
};