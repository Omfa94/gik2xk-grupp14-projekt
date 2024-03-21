import {Link, Outlet} from "react-router-dom"
import {Box,AppBar,Toolbar,Typography,Button, Container,}from '@mui/material';



function App() {
  return (
    <>
     <Box component="header" sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography display="flex" justifyContent="start" variant="h1" component="div" sx={{ flexGrow: 1,py:2 }}>
          <Link to="/">Webbshopp</Link>
          </Typography>
          <Button color="inherit"><Link to="/products/new">Skapa product</Link></Button>
          <Button color="inherit"><Link to='/cart/new'>Kundvagn</Link></Button>
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
