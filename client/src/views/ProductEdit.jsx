import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { create, getOne, remove, update } from "../sevices/ProductService";
import { Button, TextField } from "@mui/material";
import Rating from "../components/Rating"

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

  const addRating = (newRatingValue) => {
    setproduct((prevProduct) => ({
      ...prevProduct,
      ratings: [...prevProduct.ratings, { rating: newRatingValue }], // Antag att varje rating är ett objekt
    }));
  };

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
    <form>
      <div>
        <TextField
          onChange={onChange}
          value={product.title}
          name="title"
          id="title"
          label="Title"
        />
      </div>
      <div>
        <TextField
          onChange={onChange}
          value={product.description}
          multiline
          minRows={7}
          name="description"
          id="Beskrivning"
          label="Beskrivning"
        />
      </div>
      <div>
        <TextField
          onChange={onChange}
          value={product.price}
          name="price"
          id="Price"
          label="Pris"
        />
      </div>
      <div>
        <TextField
          onChange={onChange}
          value={product.imageUrl}
          name="imageUrl"
          id="imageUrl"
          label="Sökväg till bild"
        />
      </div>
      {/* man kan skriva ratingarna här i */}
      {/* <div>
        {product?.ratings &&
          product.ratings.length > 0 &&
          product.ratings.map((rating, index) => (
            <Rating key={index} rating={rating.rating} /> // Antag att `rating` är ett objekt med en `rating`-egenskap
          ))}
      </div> */}
      <Button variant="contained" onClick={() => navigate(-1)}>
        Tillbaka
      </Button>
      {id && (
        <Button onClick={onDelete} variant="contained" color="error">
          Ta bort
        </Button>
      )}
      <Button onClick={onSave} variant="contained" color="success">
        Spara
      </Button>
    </form>
  );
}

export default ProductEdit;
