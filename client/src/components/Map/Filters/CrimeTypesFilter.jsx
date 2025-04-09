// CrimeTypesFilter.js
import { crimesAgainst } from "../../../nibrs";
import { useFilters } from "../../../context/FiltersContext";
import CollapsibleCheckboxGroup from "./CollapsibleCheckboxGroup";

export default function CrimeTypesFilter() {
  const { filters, setFilters } = useFilters();
  
  // Convert crimesAgainst object to options array
  const crimeOptions = Object.keys(crimesAgainst).map(key => ({
    value: key,
    label: key
  }));

  const handleCrimeSelection = (newSelection) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      crimes_against: newSelection
    }));
  };

  return (
    <CollapsibleCheckboxGroup
      title="Type of Crime"
      options={crimeOptions}
      selectedValues={filters.crimes_against}
      onSelectionChange={handleCrimeSelection}
    />
  );
}