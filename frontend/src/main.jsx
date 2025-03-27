import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Home/Login.jsx"
import Profile from "./components/Profile/Profile.jsx"
import About from "./components/Home/About.jsx"
import Map from "./components/Home/Map/Map.jsx"

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
      domain={import.meta.env.VITE_AUTH0DOMAIN1}
      clientId={import.meta.env.VITE_AUTH0CLIENTID1}
      authorizationParams={{
         redirect_uri: "https://team-gahsp.uk.r.appspot.com/profile"
       }}
       >
      <React.StrictMode>
         <App />
      </React.StrictMode>
   </Auth0Provider>
);