import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase config (replace with your actual config)
const firebaseConfig = {
   apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
   authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
   projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
   storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
   messagingSenderId: import.meta.env.VITE_FIREBASE_SENDERID,
   appId: import.meta.env.VITE_FIREBASE_APPID
 };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);

// Auth providers
export const googleProvider = new GoogleAuthProvider();
// export const facebookProvider = new FacebookAuthProvider();