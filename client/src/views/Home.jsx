import ProductList from "../components/ProductList";
import UserList from "../components/UserList";
import {Grid} from "@mui/material";

function Home() {
    return (
    <>
    <Grid container spacing={2}>
     {/* <h2>Home</h2> ; */}
     <Grid item xs={12} sm={8}>
    <ProductList/>
    </Grid>
    <Grid item xs={12} sm={4}>
        <UserList/>
    </Grid>
    </Grid>
     </>
    )
}

export default Home;