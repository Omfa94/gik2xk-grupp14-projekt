import {Link, Outlet} from "react-router-dom"
import {Box,AppBar,Toolbar,Typography,Button, Container,}from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';


function App() {
  return (
    <>
     <Box component="header" sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
            <MenuIcon />
          <Typography display="flex" justifyContent="center" variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/">Webbshopp</Link>
          </Typography>
          <Button color="inherit"><Link to="/products/new">Skapa product</Link></Button>
        </Toolbar>
      </AppBar>
    </Box>
    <Container sx={{mt: 4}} maxWidth="xl" component="main">
      <Outlet />
      </Container>
    </>
  );
}

export default App;
