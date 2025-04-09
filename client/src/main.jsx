import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./context/AuthContext.jsx";
import { FiltersProvider } from "./context/FiltersContext.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "./components/Home/About.jsx";
import Map from "./components/Map/Map.jsx";
import DemoMap from "./components/Model/Demo.jsx";

function App() {
   return (
      <AuthProvider>
         <FiltersProvider>
            <Router>
               <Routes>
                  <Route exact path="/" element={<About />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/map" element={<Map />} />
                  <Route path="/model" element={<DemoMap />} />
               </Routes>
            </Router>
         </FiltersProvider>
      </AuthProvider>
   );
}

ReactDOM.createRoot(document.getElementById("root")).render(
   <React.StrictMode>
      <App />
   </React.StrictMode>
);
