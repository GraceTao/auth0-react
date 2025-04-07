import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

const pages = [
   { name: "About", path: "/about" },
   { name: "Maps", path: "/map" },
   { name: "Model", path: "/model" },
];

function Navbar({ isCollapsed, handleCollapse }) {
   const [anchorElNav, setAnchorElNav] = useState(null);
   const { currUser, googleLogin, logout } = useAuth();
   const navigate = useNavigate();

   const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
   };

   const handleCloseNavMenu = () => {
      setAnchorElNav(null);
   };

   const handleLogout = () => {
      logout();
      navigate("/");
   };

   return (
      <Box>
         <AppBar position="static" sx={{ boxShadow: 0 }}>
            <Container maxWidth="l">
               <Toolbar disableGutters>
                  <Typography
                     variant="h6"
                     noWrap
                     component="a"
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
                     GAHSP
                  </Typography>

                  <Box
                     sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
                  >
                     <IconButton
                        size="large"
                        // aria-label="account of current user"
                        // aria-controls="menu-appbar"
                        // aria-haspopup="true"
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
                        sx={{ display: { xs: "block", md: "none" } }}
                     >
                        {pages.map((page) => (
                           <MenuItem
                              key={page.name}
                              onClick={handleCloseNavMenu}
                              variant="text"
                              component={Link}
                              to={page.path}
                              sx={{}}
                           >
                              <Typography sx={{ textAlign: "center" }}>
                                 {page.name}
                              </Typography>
                           </MenuItem>
                        ))}
                     </Menu>
                  </Box>

                  <Typography
                     variant="h5"
                     noWrap
                     component="a"
                     href="#app-bar-with-responsive-menu"
                     sx={{
                        mr: 2,
                        display: { xs: "flex", md: "none" },
                        flexGrow: 1,
                        fontFamily: "monospace",
                        fontWeight: 700,
                        letterSpacing: ".3rem",
                        color: "inherit",
                        textDecoration: "none",
                     }}
                  >
                     GAHSP
                  </Typography>
                  <Box
                     sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
                  >
                     {pages.map((page) => (
                        <Button
                           key={page.name}
                           component={Link}
                           to={page.path}
                           onClick={handleCloseNavMenu}
                           sx={{ my: 2, color: "white", display: "block" }}
                        >
                           {page.name}
                        </Button>
                     ))}
                  </Box>
                  <Box sx={{ flexGrow: 0 }}>
                     <Button
                        onClick={currUser ? handleLogout : googleLogin}
                        sx={{ color: "white", p: 0 }}
                     >
                        {currUser ? "Logout" : "Login"}
                     </Button>
                     {/* <IconButton
                        onClick={handleCollapse}
                        sx={{
                           // position: "absolute",
                           // bottom: 8,
                           // left: 8,
                           color: "white",
                           zIndex: 10,
                        }}
                     >
                        {isCollapsed ? <ExpandMore /> : <ExpandLess />}
                     </IconButton> */}
                  </Box>
               </Toolbar>
            </Container>
         </AppBar>
      </Box>
   );
}

export default Navbar;
