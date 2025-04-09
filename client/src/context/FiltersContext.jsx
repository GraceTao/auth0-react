// context/FiltersContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import dayjs from "dayjs";
import { useAuth } from "./AuthContext";
import { crimesAgainst, policeDistricts } from "../nibrs";
import { formatURL } from "../tools";

// Default time range is [today - (7 days), today]
const defaultFilters = {
   crimes_against: Object.keys(crimesAgainst),
   crime_categories: [],
   start_date: dayjs()
      .subtract(7, "day")
      .startOf("day")
      .format("YYYY-MM-DDTHH:mm:ss.SSS"),
   end_date: dayjs().endOf("day").format("YYYY-MM-DDTHH:mm:ss.SSS"),
   police_district: policeDistricts,
};

const FiltersContext = createContext();

export const FiltersProvider = ({ children }) => {
   // const { currUser } = useAuth();
   // const [filters, setFilters] = useState(defaultFilters);
   // const [applyFilters, setApplyFilters] = useState(false);

   // // Load user preferences from Firebase when user logs in
   // useEffect(() => {
   //    const loadUserPreferences = async () => {
   //       if (currUser) {
   //          try {
   //             const userDocRef = doc(db, "users", currUser.uid);
   //             const docSnap = await getDoc(userDocRef);

   //             if (docSnap.exists() && docSnap.data().crimeFilters) {
   //                setFilters(docSnap.data().crimeFilters);
   //             }
   //          } catch (error) {
   //             console.error("Error loading user preferences:", error);
   //          }
   //       } else {
   //          // setFilters(defaultFilters);
   //       }
   //    };

   //    loadUserPreferences();
   // }, [currUser]);

   const { currUser } = useAuth();
   const [filters, setFilters] = useState(defaultFilters);
   const [applyFilters, setApplyFilters] = useState(false);
   const [areFiltersLoading, setAreFiltersLoading] = useState(false); // New state

   // Load user preferences from Firebase when user logs in
   useEffect(() => {
      const loadUserPreferences = async () => {
         if (currUser) {
            setAreFiltersLoading(true); // Start loading
            try {
               const userDocRef = doc(db, "users", currUser.uid);
               const docSnap = await getDoc(userDocRef);

               if (docSnap.exists() && docSnap.data().crimeFilters) {
                  setFilters(docSnap.data().crimeFilters);
               }
            } catch (error) {
               console.error("Error loading user preferences:", error);
            } finally {
               setAreFiltersLoading(false); // Done loading
            }
         }
      };

      loadUserPreferences();
   }, [currUser]);

   // Function to save filters to Firebase (for logged-in users)
   const savePreferences = async () => {
      if (!currUser) return;

      try {
         const userDocRef = doc(db, "users", currUser.uid);
         await setDoc(userDocRef, { crimeFilters: filters }, { merge: true });
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
            areFiltersLoading
         }}
      >
         {children}
      </FiltersContext.Provider>
   );
};

export const useFilters = () => useContext(FiltersContext);
