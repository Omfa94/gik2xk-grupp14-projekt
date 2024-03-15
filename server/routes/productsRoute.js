const router = require("express").Router();
const productService = require("../services/productService");


 

//adda rating till produkten
router.post("/:id/addRating", (req, res) => {
  const rating = req.body;
  const id = req.params.id;
  productService.addRating(id, rating).then((result) => {
    res.status(result.status).json(result.data);
  });
});

// async function getById(id) {
//   try {
//     const product = await db.product.findOne({
//       where: { id },
//       include: [
//         db.rating,
//         {
//           model: db.rating,
//           include: [db.user],
//         },
//       ],
//     });
//     return createResponseSuccess(_formatProduct(product));
//   } catch (error) {
//     return createResponseError(error.status, error.message);
//   }
// }

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
