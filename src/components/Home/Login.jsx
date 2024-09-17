import { useState, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import About from "./About";
import Map from "./Map/Map.jsx";

function Login() {
   const { loginWithRedirect, isAuthenticated } = useAuth0();
   const [about, setAbout] = useState(false);

   console.log(isAuthenticated);

   const pages = [
      { name: "About", path: "/about" },
      { name: "Crime Map", path: "/map" },
   ];

   return (
      <Box>
         <AppBar position="static">
            <Container maxWidth="xl">
               <Toolbar disableGutters>
                  <Typography
                     variant="h6"
                     noWrap
                     component="a"
                     // href="#app-bar-with-responsive-menu"
                     sx={{
                        mr: 2,
                        display: { xs: "none", md: "flex" },
                        fontFamily: "monospace",
                        fontWeight: 700,
                        letterSpacing: ".3rem",
                        color: "inherit",
                        textDecoration: "none",
                     }}
                  >
                     LOGO
                  </Typography>

                  <Box
                     sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
                  >
                     {/* {pages.map((page) => (
                        <Button
                           // key={page.name}
                           // component={Link}
                           // to={page.path}
                           // onClick={() => setAbout(true)}
                           // sx={{ my: 2, color: "white", display: "block" }}
                        >
                           {page.name}
                        </Button>
                     ))} */}
                     <Button onClick={() => setAbout(true)} sx={{ my: 2, color: "white", display: "block" }}>About</Button>
                     <Button onClick={() => setAbout(false)} sx={{ my: 2, color: "white", display: "block" }}>Map</Button>
                  </Box>

                  <Box sx={{ flexGrow: 0 }}>
                     <Tooltip title="Log in">
                        <Button
                           onClick={() =>
                              loginWithRedirect({
                                 redirect_uri: "http://localhost:5173/profile", // Redirect back to your SPA after login
                              })
                           }
                           sx={{ color: "white", p: 0 }}
                        >
                           Login
                        </Button>
                     </Tooltip>
                  </Box>
               </Toolbar>
            </Container>
         </AppBar>
         {about ? <About /> : <Map />}
      </Box>
   );
}

export default Login;
