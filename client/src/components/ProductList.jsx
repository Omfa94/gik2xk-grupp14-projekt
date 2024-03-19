import ProductItemSmall from "./ProductItemSmall";
import { getAll } from "../sevices/ProductService";
import { useEffect, useState } from "react";

function ProductList({ pathname }) {
  // const products = [
  //   {
  //     id: 1,
  //     title: "BMW",
  //     description: "Köra bil",
  //     price: 100,
  //     imageUrl: "http://dimo.com",
  //     createdAt: "2024-03-14T13:55:39.000Z",
  //     updatedAt: "2024-03-14T19:50:53.000Z",
  //     ratings: [
  //       {
  //         rating: 5,
  //         author: "Dimo Faroughi",
  //         createdAt: "2024-03-14T22:34:57.000Z",
  //       },
  //     ],
  //   },
  //   {
  //     id: 3,
  //     title: "En fin Volvo som är BMW",
  //     description: "Om du kör den så kommer du tycka att du flyger.",
  //     price: 1000,
  //     imageUrl: "http://dimo.com",
  //     createdAt: "2024-03-16T22:05:38.000Z",
  //     updatedAt: "2024-03-16T22:05:38.000Z",
  //     ratings: [
  //       {
  //         rating: 5,
  //         author: "Dimo Faroughi",
  //         createdAt: "2024-03-16T22:07:36.000Z",
  //       },
  //     ],
  //   },
  //   {
  //     id: 4,
  //     title: "En fin bmw som är volvo",
  //     description: "Kom och test så få de se.",
  //     price: 10,
  //     imageUrl: "http://dimo.com",
  //     createdAt: "2024-03-16T22:06:31.000Z",
  //     updatedAt: "2024-03-16T22:06:31.000Z",
  //     ratings: [
  //       {
  //         rating: 3,
  //         author: "Dimo Faroughi",
  //         createdAt: "2024-03-16T22:08:03.000Z",
  //       },
  //     ],
  //   },
  // ];
  // getAll().then(products=> console.log(products))

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
