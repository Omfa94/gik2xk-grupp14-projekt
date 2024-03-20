import ProductItemLarge from "../components/ProductItemLarge";
import RatingForm from "../components/RatingForm";
import CustomRating from "../components/Rating";
import { Box, Button, Container } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { addRating, getOne } from "../sevices/ProductService";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import EditIcon from "@mui/icons-material/Edit";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

function ProductDetail() {
  // const product= {
  //     "id": 3,
  //     "title": "En fin Volvo som är BMW",
  //     "description": "Om du kör den så kommer du tycka att du flyger.",
  //     "price": 1000,
  //     "imageUrl": "http://dimo.com",
  //     "createdAt": "2024-03-16T22:05:38.000Z",
  //     "updatedAt": "2024-03-16T22:05:38.000Z",
  //     "ratings": [
  //         {
  //             "rating": 5,
  //             "author": "Dimo Faroughi",
  //             "createdAt": "2024-03-16T22:07:36.000Z"
  //         }
  //     ]
  // };

    const { id } = useParams();

    const [product, setproduct] = useState(null);

    useEffect(() => {
      getOne(id).then((product) => setproduct(product));
    }, [id]);

    const navigate = useNavigate();

    function onRatingAdd(rating) {
      addRating(product.id, rating)
        .then(() => getOne(id))
        .then((product) => setproduct(product));
    }

    return product ? (
      <Container maxWidth="lg">
        <ProductItemLarge product={product} />
        <Box display="flex" justifyContent="space-between" mb={4}>
        <Button
          color="secondary"
          variant="contained"
          startIcon={<ChevronLeftIcon />}
          sx={{mr:2}}
          onClick={() => navigate(-1)}
        >
          Tillbaka
        </Button>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={() => navigate(`/products/${product.id}/edit`)}
        >
          Ändra
        </Button>
        </Box>
        <Button variant="contained" startIcon={<AddShoppingCartIcon/>}>Lägg till varukorg</Button>

        <RatingForm onSave={onRatingAdd} />
        {product.ratings &&
          product.ratings.map((rating, i) => (
            <CustomRating key={`rating_${i}`} rating={rating} />
          ))}
      </Container>
    ) : (
      <h3>Kunde inte hämta produkt</h3>
    );
}

export default ProductDetail;
