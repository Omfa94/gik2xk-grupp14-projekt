import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CardHeader,
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
    <Card variant="outlined" sx={{ my: 4, borderRadius: "2" }} elevation={3}>
      <CardHeader
        title={<Typography variant="h2">{product.title}</Typography>}
        subheader={`Produkten skapades den: ${formattedDate}`}
      />

      <CardMedia
        component="img"
        height="500"
        image={product.imageUrl || placeholderImage}
        alt={`Bild på ${product.title}`}
      />

      <CardContent>
        <Typography variant="body2">{product.description}</Typography>
        <Box mt={5} display="flex" justifyContent="end">
          <Typography variant="h6">Pris: {product.price} SEK</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default ProductItemLarge;
