// context/FiltersContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import dayjs from "dayjs";
import { useAuth } from "./AuthContext";

// Default time range is [today - (30 days), today]
const defaultFilters = {
   crimes_against: [],
   crime_categories: [],
   start_date: dayjs()
      .subtract(30, "day")
      .startOf("day")
      .format("YYYY-MM-DDTHH:mm:ss.SSS"),
   end_date: dayjs().endOf("day").format("YYYY-MM-DDTHH:mm:ss.SSS"),
   police_district: [],
};

const FiltersContext = createContext();

export const FiltersProvider = ({ children }) => {
   const { currUser } = useAuth();
   const [filters, setFilters] = useState(defaultFilters);
   const [applyFilters, setApplyFilters] = useState(false);

   // Load user preferences from Firebase when user logs in
   useEffect(() => {
      const loadUserPreferences = async () => {
         if (currUser) {
            try {
               const userPrefsRef = doc(db, "userPreferences", currUser.uid);
               const docSnap = await getDoc(userPrefsRef);

               if (docSnap.exists() && docSnap.data().filters) {
                  setFilters(docSnap.data().filters);
               }
            } catch (error) {
               console.error("Error loading user preferences:", error);
            }
         } else {
            // Reset to defaults when user logs out
            setFilters(defaultFilters);
         }
      };

      loadUserPreferences();
   }, [currUser]);

   // Function to save filters to Firebase (for logged-in users)
   const savePreferences = async () => {
      if (!currUser) return;

      try {
         const userPrefsRef = doc(db, "userPreferences", currUser.uid);
         await setDoc(userPrefsRef, { filters }, { merge: true });
      } catch (error) {
         console.error("Error saving preferences:", error);
      }
   };

   // Function to reset filters to defaults
   const resetFilters = () => {
      setFilters(defaultFilters);
   };

   return (
      <FiltersContext.Provider
         value={{
            filters,
            setFilters,
            savePreferences,
            resetFilters,
            applyFilters,
            setApplyFilters,
         }}
      >
         {children}
      </FiltersContext.Provider>
   );
};

export const useFilters = () => useContext(FiltersContext);
