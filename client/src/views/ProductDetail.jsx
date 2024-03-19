import ProductItemLarge from "../components/ProductItemLarge";
import RatingForm from "../components/RatingForm";
import CustomRating from "../components/Rating";
import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { addRating, getOne } from "../sevices/ProductService";

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

  //funktion för att lägga till rating!! ett försök bara :)
  function onRatingAdd(rating) {
    addRating(product.id, rating)
      .then(() => getOne(id))
      .then((product) => setproduct(product));
  }

  return product ? (
    <div>
      <ProductItemLarge product={product} />
      <Button onClick={() => navigate(-1)}>Tillbaka</Button>
      <Button onClick={() => navigate(`/products/${product.id}/edit`)}>
        Ändra
      </Button>
      <Button>Lägg till varokorg</Button>

      <RatingForm onSave={onRatingAdd} />
      {product.ratings &&
        product.ratings.map((rating, i) => (
          <CustomRating key={`rating_${i}`} rating={rating} />
        ))}
    </div>
  ) : (
    <h3>Kunde inte hämta produkt</h3>
  );
}

export default ProductDetail;
