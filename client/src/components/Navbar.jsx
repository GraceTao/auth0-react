import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
   AppBar,
   Box,
   Toolbar,
   IconButton,
   Typography,
   Menu,
   Container,
   Button,
   MenuItem,
   Snackbar,
   Alert,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../assets/GAHSPTileUpscale.png";

const pages = [
   { name: "About", path: "/about" },
   { name: "Crime Map", path: "/map" },
   { name: "Model Demo", path: "/model" },
];

function Navbar() {
   const [anchorElNav, setAnchorElNav] = useState(null);
   const { currUser, googleLogin, logout, authMessage, closeAuthMessage } =
      useAuth();

   // Consolidated Snackbar state
   const [snackbar, setSnackbar] = useState({
      open: false,
      message: "",
      severity: "success",
   });

   const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
   };

   const handleCloseNavMenu = () => {
      setAnchorElNav(null);
   };

   const showSnackbar = (message, severity) => {
      setSnackbar({
         open: true,
         message,
         severity,
      });
   };

   const handleCloseSnackbar = () => {
      setSnackbar((prev) => ({ ...prev, open: false }));
   };

   useEffect(() => {
      if (currUser) {
         showSnackbar(`Welcome, ${currUser.displayName}!`, "success");
      }
   }, [currUser]);

   const handleLogin = async () => {
      try {
         await googleLogin();
      } catch (error) {
         showSnackbar("Error logging in. Please try again.", "error");
      }
   };

   const handleLogout = async () => {
      try {
         await logout();
         showSnackbar("Logout successful!", "success");
      } catch (error) {
         showSnackbar("Error logging out. Please try again.", "error");
      }
   };

   return (
      <Box>
         <AppBar position="static" sx={{ boxShadow: 0 }}>
            <Container maxWidth={false}>
               <Toolbar disableGutters>
                  {/* <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "none", sm: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              GAHSP
            </Typography> */}
                  <Box
                     component="img"
                     src={Logo}
                     alt="GAHSP Logo"
                     sx={{
                        height: "100%",
                        maxHeight: 64,
                        width: "auto",
                        mr: 2,
                        display: { xs: "none", sm: "flex" },
                     }}
                  />

                  <Box
                     sx={{ flexGrow: 1, display: { xs: "flex", sm: "none" } }}
                  >
                     <IconButton
                        size="large"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                     >
                        <MenuIcon />
                     </IconButton>
                     <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                           vertical: "bottom",
                           horizontal: "left",
                        }}
                        keepMounted
                        transformOrigin={{
                           vertical: "top",
                           horizontal: "left",
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                     >
                        {pages.map((page) => (
                           <MenuItem
                              key={page.name}
                              onClick={handleCloseNavMenu}
                              component={Link}
                              to={page.path}
                           >
                              <Typography sx={{ textAlign: "center" }}>
                                 {page.name}
                              </Typography>
                           </MenuItem>
                        ))}
                     </Menu>
                  </Box>

                  <Box
                     sx={{ flexGrow: 1, display: { xs: "none", sm: "flex" } }}
                  >
                     {pages.map((page) => (
                        <Button
                           key={page.name}
                           component={Link}
                           to={page.path}
                           onClick={handleCloseNavMenu}
                           sx={{
                              my: 2,
                              mx: 1,
                              color: "white",
                              // display: "block",
                              "&:hover": {
                                 color: "lightgray",
                              },
                           }}
                        >
                           {page.name}
                        </Button>
                     ))}
                  </Box>
                  <Box sx={{ flexGrow: 0 }}>
                     <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                     >
                        {currUser && (
                           <Box
                              component="img"
                              src={currUser.photoURL}
                              alt={currUser.displayName}
                              sx={{
                                 width: 36,
                                 height: 36,
                                 borderRadius: "50%",
                                 objectFit: "cover",
                              }}
                           />
                        )}
                        <Button
                           onClick={currUser ? handleLogout : handleLogin}
                           sx={{
                              color: "white",
                              p: 0,
                              "&:hover": {
                                 color: "lightgray",
                              },
                           }}
                        >
                           {currUser ? "Logout" : "Login"}
                        </Button>
                     </Box>
                  </Box>
               </Toolbar>
            </Container>
         </AppBar>

         {/* Snackbar for messages */}
         <Snackbar
            open={authMessage.open}
            autoHideDuration={3000}
            onClose={closeAuthMessage}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
         >
            <Alert
               variant="filled"
               onClose={closeAuthMessage}
               severity={authMessage.severity}
               sx={{ width: "100%", fontSize: "1rem" }}
            >
               {authMessage.message}
            </Alert>
         </Snackbar>
      </Box>
   );
}

export default Navbar;
