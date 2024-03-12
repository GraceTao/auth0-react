import { useAuth0 } from "@auth0/auth0-react";
import {
   Alert,
   Box,
   TextField,
   FormLabel,
   Button,
   Typography,
   Checkbox,
   RadioGroup,
   Radio,
   FormControlLabel,
   FormGroup,
   CircularProgress,
   Dialog,
   DialogContent,
} from "@mui/material";

function Profile() {
   const { logout } = useAuth0();

   return (
      <>
         <h1>Login success! User profile page</h1>
         <button
            onClick={() =>
               logout({
                  logoutParams: {
                     returnTo: "http://localhost:5173"
                  }
               })
            }
         >
            Log out
         </button>
      </>
   );
}

export default Profile;
