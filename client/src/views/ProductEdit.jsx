import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { create, getOne, remove, update } from "../sevices/ProductService";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';

function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const emptyProduct = {
    id: 0,
    title: "",
    description: "",
    price: "",
    imageUrl: "",
  };

  const [product, setproduct] = useState(emptyProduct);

  useEffect(() => {
    if (id) {
      getOne(id).then((product) => setproduct(product));
    } else {
      setproduct(emptyProduct);
    }
  }, [id]);

  function onChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    const newProduct = { ...product, [name]: value };
    setproduct(newProduct);
  }

  function onSave() {
    if (product.id === 0) {
      create(product).then((response) => {
        navigate("/", { replace: true, state: response });
      });
    } else {
      update(product).then((response) =>
        navigate(`/products/${product.id}`, { replace: true, state: response })
      );
    }
  }

  function onDelete() {
    remove(product.id).then((response) =>
      navigate("/", { replace: true, state: response })
    );
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h2">
        {product.id ? "Ändra produkt" : "Skapa produkt"}
      </Typography>
      <Box mt={4}>
        <form>
          <Box>
            <TextField
              fullWidth
              margin="normal"
              onChange={onChange}
              value={product.title}
              name="title"
              id="title"
              label="Title"
            />
          </Box>
          <Box>
            <TextField
              fullWidth
              margin="normal"
              onChange={onChange}
              value={product.description}
              multiline
              minRows={7}
              name="description"
              id="Beskrivning"
              label="Beskrivning"
            />
          </Box>
          <Box>
            <TextField
              fullWidth
              margin="normal"
              onChange={onChange}
              value={product.price}
              name="price"
              id="Price"
              label="Pris"
            />
          </Box>
          <Box>
            <TextField
              fullWidth
              margin="normal"
              onChange={onChange}
              value={product.imageUrl}
              name="imageUrl"
              id="imageUrl"
              label="Sökväg till bild"
            />
          </Box>
          <Box display="flex" mt={2} justifyContent="space-between">
            <Box>
              <Button
                color="secondary"
                variant="contained"
                startIcon={<ChevronLeftIcon />}
                sx={{ mr: 2 }}
                onClick={() => navigate(-1)}
              >
                Tillbaka
              </Button>
              {id && (
                <Button startIcon={<DeleteIcon/>} onClick={onDelete} variant="contained" color="error">
                  Ta bort
                </Button>
              )}
            </Box>
            <Button onChange={onChange} startIcon={<SaveIcon/>} onClick={onSave} variant="contained" color="success">
              Spara
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
}

export default ProductEdit;
