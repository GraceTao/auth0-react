import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login.jsx"
import Profile from "./Profile.jsx"
import About from "./About.jsx"
import Map from "./Map.jsx"

// const googleClientId = import.meta.env.VITE_ID;
// console.log(import.meta.env.VITE_ID);

// ReactDOM.createRoot(document.getElementById("root")).render(
//    <GoogleOAuthProvider clientId={googleClientId}>
//       <React.StrictMode>
//          <App />
//       </React.StrictMode>
//       ,
//    </GoogleOAuthProvider>
// );

function App() {
   return (
      <Router>
         <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
            <Route path="/map" element={<Map />} />
         </Routes> 
      </Router>
   );
}

ReactDOM.createRoot(document.getElementById("root")).render(
   <Auth0Provider 
      domain={import.meta.env.VITE_AUTH0DOMAIN}
      clientId={import.meta.env.VITE_AUTH0CLIENTID}
      authorizationParams={{
         redirect_uri: "http://localhost:5176/profile"
       }}
       >
      <React.StrictMode>
         <App />
      </React.StrictMode>
   </Auth0Provider>
);