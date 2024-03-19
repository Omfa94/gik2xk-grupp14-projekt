import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Paper,
  Typography,
} from "@mui/material";
import placeholderImage from "../assets/placeholder.png";

function ProductItemLarge({ product }) {
  const creationDate = new Date(product.createdAt);
  const formattedDate = creationDate.toLocaleDateString("sv-SE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <Paper sx={{ my: 4, p: "4", borderRadius: "2" }} elevation={3}>
      <Box>
        <Typography variant="h2">{product.title}</Typography>
        <Typography>Produkten skapades den:{formattedDate}</Typography>
      </Box>
      <Card elevation={0}>
        <CardMedia
            height="500"
          component="img"
          image={product.imageUrl || placeholderImage}
          alt="Bild på produkten"
        />
        <CardContent>
          <Typography  variant="body5">{product.description}</Typography>
          <Box mt={5} display="flex" justifyContent="end">
          <Typography variant="h6">{product.price} SEK</Typography>
          </Box>
        </CardContent>
      </Card>
    </Paper>
  );
}

export default ProductItemLarge;
