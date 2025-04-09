import { createContext, useContext, useEffect, useState } from "react";
import { auth, googleProvider, db } from "../firebase";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";

// Create Context
const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
   const [currUser, setCurrUser] = useState(null);
   const [authMessage, setAuthMessage] = useState({
      open: false,
      message: "",
      severity: "success"
   });

   // Show message helper
   const showAuthMessage = (message, severity = "success") => {
      setAuthMessage({
         open: true,
         message,
         severity
      });
   };

   // Close message handler
   const closeAuthMessage = () => {
      setAuthMessage(prev => ({ ...prev, open: false }));
   };

   // Listen for auth state changes
   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
         if (user && !currUser) {
            showAuthMessage(`Welcome, ${user.displayName}!`);
         }
         setCurrUser(user);
      });
      return () => unsubscribe();
   }, [currUser]);

   // Check if user exists, create if not
   const checkAndCreateUserProfile = async (user) => {
      try {
         const userRef = doc(db, "users", user.uid);
         const docSnap = await getDoc(userRef);
         
         if (!docSnap.exists()) {
           await setDoc(userRef, {
             uid: user.uid,
             email: user.email,
             displayName: user.displayName,
             photoURL: user.photoURL,
             createdAt: new Date(),
             lastLogin: new Date(),
             crimeFilters: null
           });
         } else {
           await setDoc(userRef, {
             lastLogin: new Date()
           }, { merge: true });
         }
      } catch (error) {
         console.log("Error: ", error);
      }
   };

   // Function to log in with Google
   const googleLogin = async () => {
      try {
         const result = await signInWithPopup(auth, googleProvider);
         await checkAndCreateUserProfile(result.user);
      } catch (error) {
         // showAuthMessage("Error logging in. Please try again.", "error");
         console.error("Login error:", error);
      }
   };

   // Function to log out
   const logout = async () => {
      try {
         await signOut(auth);
         showAuthMessage("Logout successful!");
      } catch (error) {
         showAuthMessage("Error logging out. Please try again.", "error");
         console.error("Logout error:", error);
      }
   };

   return (
      <AuthContext.Provider value={{ 
         currUser, 
         googleLogin, 
         logout,
         authMessage,
         closeAuthMessage
      }}>
         {children}
      </AuthContext.Provider>
   );
};

// Hook to use AuthContext
export const useAuth = () => useContext(AuthContext);