function ProductItemSmall({product}) {
  return (
    <>
      <h3>{product.title}</h3>
      <p>description: {product.description}</p>
      <p>Pris: {product.price}</p>
      <p>Pic: {product.imageUrl}</p>
    </>
  );
}

export default ProductItemSmall;
