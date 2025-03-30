import { createContext, useContext, useEffect, useState } from "react";
import { auth, googleProvider, db } from "../firebase";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";

// Create Context
const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
   const [currUser, setCurrUser] = useState(null);

   // Listen for auth state changes
   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
         setCurrUser(user); // Sets the user if logged in, or null if logged out
      });
      return () => unsubscribe(); // Cleanup listener on unmount
   }, []);

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
             lastLogin: new Date()
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
         console.error("Login error:", error);
      }
   };

   // Function to log out
   const logout = async () => {
      try {
         await signOut(auth);
      } catch (error) {
         console.error("Logout error:", error);
      }
   };

   return (
      <AuthContext.Provider value={{ currUser, googleLogin, logout }}>
         {children}
      </AuthContext.Provider>
   );
};

// Hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
