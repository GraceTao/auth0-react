// CrimeTypesFilter.js
import { policeDistricts } from "../../../nibrs";
import { useFilters } from "../../../context/FiltersContext";
import CollapsibleCheckboxGroup from "./CollapsibleCheckboxGroup";

export default function CrimeTypesFilter() {
   const { filters, setFilters } = useFilters();

   // Convert policeDistricts object to options array
   const districtOptions = policeDistricts.map((key) => ({
      value: key,
      label: key,
   }));

   const handleCrimeSelection = (newSelection) => {
      setFilters((prevFilters) => ({
         ...prevFilters,
         police_district: newSelection,
      }));
   };

   return (
      <CollapsibleCheckboxGroup
         title="Police District"
         options={districtOptions}
         selectedValues={filters.police_district}
         onSelectionChange={handleCrimeSelection}
      />
   );
}
