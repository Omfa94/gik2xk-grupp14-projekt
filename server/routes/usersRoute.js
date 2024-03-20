const router = require('express').Router();
const db = require('../models');
const validate = require('validate.js');
const userService = require('../services/userService');

//Använd för att hämta användarens varokorg.
router.get("/:id/getCart/",(req,res)=>{});


const constraints = {
  email: {
    length: {
      minimum: 4,
      maximum: 200,
      tooShort: "^E-postaddressen måste vara minst %{count} tecken lång.",
      tooLong: "^E-postaddressen får inte vara längre än %{count} tecken lång.",
    },
    email: {
        message:"^E-postaddressen är i ett felaktigt format."
    }
  },
  password : {
    length: {
        minimum: 8,
        maximum: 20,
        tooShort: "^Lösenordet måste vara minst %{count} tecken lång.",
        tooLong: "^Lösenordet får inte vara längre än %{count} tecken lång.",
      },
      format: {
        pattern: "[A-Za-z0-9]+",
        message: "^Lösenordet är i ett felaktigt format."
      }
  },
};

router.get("/", (req, res) => {
  db.user.findAll().then((result) => {
    res.send(result);
  });
});

router.post("/", (req, res) => {
  const user = req.body;
  const invalidData = validate(user, constraints);
  if (invalidData) {
    res.status(400).json(invalidData);
  } else {
    db.user.create(user).then((result) => {
      res.send(result);
    });
  }
});

router.put("/", (req, res) => {
    const user = req.body;
    const invalidData = validate(user, constraints);
    const id = user.id;
    if(invalidData || !id ){
        res.status(400).json(invalidData || "Id är obligatoriskt ");
    }else{
        db.user
        .update(user, {
          where: { id: user.id },
        })
        .then((result) => {
          res.send('Användareinfo har uppdaterats.');
        });
    }
});

router.delete("/", (req, res) => {
  db.user
    .destroy({
      where: { id: req.body.id },
    })
    .then((result) => {
      res.json("Användaren raderades.");
    });
});

module.exports = router;