import { Box, Typography } from "@mui/material";
import {Link} from "react-router-dom"

function UserItemSmall({ user }) {
  return (
    <>
      {/* om man vill lägga till bild på användaren.  */}
      {/* <img src={user.imageUrl} alt="" /> */}
      
      <Box sx={{maxWidth:"20rem"}}
      display="flex" alignItems="center" flexWrap="wrap" gap="0.7rem">
      <Box sx={{marginBottom:"1rem"}}>
      <h3 >
        {user.firstName} {user.lastName} 
      </h3>
      <span>{user.email}</span>
      </Box>
      </Box>
    </>
  );
}

export default UserItemSmall;
