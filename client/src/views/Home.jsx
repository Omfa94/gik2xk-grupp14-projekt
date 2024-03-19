import ProductList from "../components/ProductList";
import UserList from "../components/UserList";
import { Grid, Paper, Typography } from "@mui/material";

function Home() {
  return (
    <>
      <Grid container spacing={8}>
        {/* <h2>Home</h2> ; */}
        <Grid component="section" item xs={12} sm={8}>
          <Paper elevation={3} sx={{ p: 2, mt: 4, borderRadius: 2 }}>
            <Typography variant="h2">Senaste produkter</Typography>
            <ProductList />
          </Paper>
        </Grid>
        <Grid container height="0" sx={{borderRadius: 2 }} component="section" item xs={12} sm={4}>
          <Paper elevation={3} sx={{ p: 2, mt: 4, borderRadius: 2 }}>
          <Typography variant="h3">Användare</Typography>
            <UserList />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default Home;
