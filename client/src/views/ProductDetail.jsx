//test data

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  Box, Button, Container, FormControl,
  InputLabel, Select, MenuItem, Alert
} from '@mui/material';
import ProductItemLarge from "../components/ProductItemLarge";
import RatingForm from "../components/RatingForm";
import CustomRating from "../components/Rating";
import { getOne, addRating } from "../sevices/ProductService";
import { addProductToCart } from '../sevices/CartService';
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import EditIcon from "@mui/icons-material/Edit";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setproduct] = useState(null);
  const [amount, setAmount] = useState(1);
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    getOne(id).then((product) => setproduct(product));
  }, [id]);

  const onRatingAdd = (rating) => {
    addRating(product.id, rating)
      .then(() => getOne(id))
      .then((product) => setproduct(product));
  };

  const handleClickBuy = async () => {
    try {
      await addProductToCart(id, 1, amount);
      setAlert({
        open: true,
        message: 'Produkten har lagts till i varukorgen!',
        severity: 'success',
      });
    } catch (error) {
      console.error('Något gick fel:', error);
      setAlert({
        open: true,
        message: 'Något gick fel när produkten skulle läggas till.',
        severity: 'error',
      });
    }
  };

  const handleChange = (event) => {
    setAmount(event.target.value);
  };

  return (
    <Container maxWidth="lg">
      {alert.open && (
        <Alert
          onClose={() => setAlert({ ...alert, open: false })}
          variant='filled'
          severity={alert.severity}
          sx={{ m: 2 }}
        >
          {alert.message}
        </Alert>
      )}
      {product ? (
        <>
          <ProductItemLarge product={product} />
          <Box display="flex" justifyContent="space-between" mb={4}>
            <Button
              color="secondary"
              variant="contained"
              startIcon={<ChevronLeftIcon />}
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
            <Box display="flex" justifyContent="space-between" mb={2} >
            <FormControl fullWidth>
              <InputLabel>Antal</InputLabel>
              <Select
                value={amount}
                onChange={handleChange}
              >
                {[...Array(10).keys()].map((x) => (
                  <MenuItem key={x + 1} value={x + 1}>{x + 1}</MenuItem>
                ))}
              </Select>
            </FormControl>
            </Box>
            <Box display="flex" justifyContent="end"mb={4}>
            <Button
              startIcon={<AddShoppingCartIcon />}
              variant="contained"
              color="primary"
              onClick={handleClickBuy}
            >
              Lägg till varukorg
            </Button>
          </Box>
          <Box sx={{paddingInline:1}}>
          <RatingForm onSave={onRatingAdd} />
          {product.ratings && product.ratings.map((rating, i) => (
            <CustomRating key={`rating_${i}`} rating={rating} />
          ))}
          </Box>
        </>
      ) : (
        <h3>Kunde inte hämta produkt.</h3>
      )}
    </Container>
  );
}

export default ProductDetail;









