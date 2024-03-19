import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import ProductEdit from "./views/ProductEdit.jsx";
import Home from './views/Home.jsx';
import Products from './views/Products.jsx';
import ProductDetail from './views/ProductDetail.jsx';
import Cart from "./views/Cart.jsx"
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CssBaseline } from "@mui/material";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },

      { path: "/products/:id/edit", element: <ProductEdit /> },
      { path: "/products/new", element: <ProductEdit /> },
      { path: "/products/", element: <Products /> },
      { path: "/products/:id", element: <ProductDetail /> },
      { path: "/cart/new", element: <Cart /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CssBaseline/>
    <RouterProvider router={router} />
  </React.StrictMode>
);
