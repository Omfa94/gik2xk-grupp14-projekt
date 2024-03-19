import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import placeholderImage from "../assets/placeholder.png";
import {truncate } from "../common/FormatHelper"
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

function ProductItemSmall({ product }) {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Intl.DateTimeFormat("sv-SE", options).format(
      new Date(dateString)
    );
  };

  return (
    <>
      <Card variant="outlined" sx={{ mb: 4 }}>
        <CardHeader
          title={
            <Typography variant="h3">
              <Link to={`/products/${product.id}`}>{product.title}</Link>
            </Typography>
          }
          subheader={`Skapad den: ${formatDate(product.createdAt)}`}
        />

        <CardMedia
          component="img"
          height="200"
          image={product.imageUrl || placeholderImage}
          alt={`Bild till ${product.title}`}
        />
        <CardContent>
          <Typography variant="body3">{truncate(product.description,200)}
          </Typography>
        </CardContent>
        <Box mb={2} ml={2}>
          <Typography variant="h6">Pris: {product.price} SEK</Typography>
        </Box>

        <CardActions sx={{display: "flex", justifyContent:"end"}}>
          <Button
          component={Link} 
          to={`/products/${product.id}`}
          endIcon={<ChevronRightIcon/>}>Läs mer</Button>
        </CardActions>

      </Card>
    </>
  );
}

export default ProductItemSmall;
