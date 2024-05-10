import { useAuth0 } from "@auth0/auth0-react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";

function Profile() {
   const { isAuthenticated, user, logout, isLoading } = useAuth0();

   if (isLoading) {
      return <div>Loading ...</div>;
   }

   return isAuthenticated ? (
      <>
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

                  <Box sx={{ flexGrow: 1 }} />

                  <Box>
                     <img src={user.picture} alt={user.name} />
                     <Typography>{user.name}</Typography>
                     <Typography>{user.email}</Typography>
                  </Box>

                  <Tooltip title="Log out">
                     <Button
                        onClick={() =>
                           logout({
                              logoutParams: {
                                 returnTo: "http://localhost:5176",
                              },
                           })
                        }
                        sx={{ color: "white", p: 0 }}
                     >
                        Logout
                     </Button>
                  </Tooltip>
               </Toolbar>
            </Container>
         </AppBar>
         <h4>Login success! User profile page</h4>
      </>
   ) : (
      <>
         <p>Authentication failed</p>
      </>
   );
}

export default Profile;
