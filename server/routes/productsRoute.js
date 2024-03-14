const router = require("express").Router();
const productService = require("../services/productService");

//Ge betyg till en produkt.
router.get("/id/addRatings", (req, res) => {});
//adda rating till produkten
router.post("/:id/addRating", (req, res) => {});

//adda produkten till varokorgen.
//Innehåll i body: userId, amount.
router.post("/:id/addToCart", (req, res) => {});

//Hämta en specifik produkt.
router.get("/:id", (req, res) => {
  const id = req.params.id;

  productService.getById(id).then((result) => {
    res.status(result.status).json(result.data);
  });
});

//hämtar alla produkter
router.get("/", (req, res) => {
  productService.getAll().then((result) => {
    res.status(result.status).json(result.data);
  });
});

router.post("/", (req, res) => {
  const product = req.body;
  productService.create(product).then((result) => {
    res.status(result.status).json(result.data);
  });
});

router.put("/", (req, res) => {
  const product = req.body;
  const id = product.id;

  productService.update(product, id).then((result) => {
    res.status(result.status).json(result.data);
  });
});

router.delete("/", (req, res) => {
  const id = req.body.id;
  productService.destroy(id).then((result) => {
    res.status(result.status).json(result.data);
  });
});

module.exports = router;
