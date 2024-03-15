//kan raderas helt. vi kan sköra det genom produktraoutes.

const router = require("express").Router();
const db = require("../models");
const validate = require("validate.js");
// dubbelkolla om denna behövs.
const constraints = {
  payed: {
    presence: {
    allowEmpty: false,
      message: "^Betalningsstatus måste anges."
    },
    inclusion: {
        within: [true, false],
        message: "^Betalningsstatus måste vara true eller false."
      }
  },
};

//kan raders.
//hämta en specefik varokorg baserad på usersid.
//Innehåll i body: userId, productId, amount.
router.post("/cart/addProduct",(req,res)=>{});

//hämtar hela varokorgen.
router.get("/", (req, res) => {
  db.cart.findAll().then((result) => {
    res.send(result);
  });
});

router.post("/", (req, res) => {
  const cart = req.body;
  const invalidData = validate(cart, constraints);
  if (invalidData) {
    res.status(400).json(invalidData);
  } else {
    db.cart.create(cart).then((result) => {
      res.send(result);
    });
  }
});

router.put("/", (req, res) => {
    const cart = req.body;
    const invalidData = validate(cart, constraints);
    const id = cart.id;
    if(invalidData || !id ){
        res.status(400).json(invalidData || "Id är obligatoriskt ");
    }else{
        db.cart
        .update(cart, {
          where: { id: cart.id },
        })
        .then((result) => {
          res.send(result);
        });
    }
});

router.delete("/", (req, res) => {
  db.cart
    .destroy({
      where: { id: req.body.id },
    })
    .then((result) => {
      res.json("Produkten raderades");
    });
});

module.exports = router;