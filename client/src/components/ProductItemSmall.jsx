import {Link} from "react-router-dom";


function ProductItemSmall({product}) {
  return (
    <>
    <Link to={`/products/${product.id}`}>
      <h3>{product.title}</h3>
      </Link>
      <p>Beskrivning: {product.description}</p>
      <p>Pris: {product.price}</p>
      <p>Bild: {product.imageUrl}</p>
    </>
  );
}

export default ProductItemSmall;
