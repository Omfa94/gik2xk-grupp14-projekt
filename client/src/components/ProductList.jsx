import ProductItemSmall from "./ProductItemSmall";
import { getAll } from "../sevices/ProductService";
import { useEffect, useState } from "react";

function ProductList({ pathname }) {

  const [products, setproducts] = useState([]);
  useEffect(() => {
    getAll(pathname).then((products) => {
      setproducts(products);
    });
  }, [pathname]);

  return (
    <ul>
      {products?.length > 0 ? (
        products
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((product) => (
            <li key={`products_${product.id}`}>
              <ProductItemSmall product={product} />
            </li>
          ))
      ) : (
        <h3>Kunde inte hämta product.</h3>
      )}
    </ul>
  );
}

export default ProductList;
