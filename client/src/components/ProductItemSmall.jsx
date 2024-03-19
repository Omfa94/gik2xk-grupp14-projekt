import React from 'react';
import {Link} from "react-router-dom";


function ProductItemSmall({product}) {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }; 
    return new Intl.DateTimeFormat('sv-SE', options).format(new Date(dateString));
  };

  return (
    <>
      <Link to={`/products/${product.id}`}>
        <h3>{product.title}</h3>
      </Link>
      <p>Beskrivning: {product.description}</p>
      <p>Pris: {product.price} kr</p>
      <p>Skapad: {formatDate(product.createdAt)}</p> {/* hur du kan använda formatDate-funktionen */}
      <img src={product.imageUrl} alt={product.title} style={{ width: '200px', height: 'auto' }} /> {/* bildvisning */}
    </>
  );
}

export default ProductItemSmall;
