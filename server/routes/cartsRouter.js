
const router = require("express").Router();
const db = require("../models");
const cartService = require('../services/cartService');
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




//hämtar hela varokorgen.
router.get("/", (req, res) => {
  db.cart.findAll().then((result) => {
    res.send(result);
  });
});

router.get('/getCartRows', (req, res) => {
	const userId = req.query.userId;
	cartService.getCartRows(userId).then((result) => {
		res.status(result.status).json(result.data);
	});
});

router.get('/:id', (req, res) => {
	const id = req.params.id;
	cartService.getById(id).then((result) => {
		res.status(result.status).json(result.data);
	});
});

router.post('/', (req, res) => {
	const cart = req.body;
	cartService.create(cart).then((result) => {
		res.status(result.status).json(result.data);
	});
});

router.post('/addProduct', (req, res) => {
	const productId = req.body.productId;
	const userId = req.body.userId;
	const amount = req.body.amount;
	cartService.addProduct(userId, productId, amount).then((result) => {
		res.status(result.status).json(result.data);
	});
});

router.put('/reduceAmount', (req, res) => {
	const userId = req.body.userId;
	const productId = req.body.productId;
	console.log('userId:', userId, 'productId:', productId);
	cartService.reduceAmount(1, productId).then((result) => {
		res.status(result.status).json(result.data);
	});
});

router.put('/increaseAmount', (req, res) => {
	const userId = req.body.userId;
	const productId = req.body.productId;
	cartService.increaseAmount(userId, productId).then((result) => {
		res.status(result.status).json(result.data);
	});
});

router.put('/updateCartRow', (req, res) => {
	const userId = req.body.userId;
	const productId = req.body.productId;
	const amount = req.body.amount;
	cartService.updateCartRow(userId, productId, amount).then((result) => {
		res.status(result.status).json(result.data);
	});
});

router.put('/:id', (req, res) => {
	const cart = req.body;
	const id = req.params.id;
	cartService.update(cart, id).then((result) => {
		res.status(result.status).json(result.data);
	});
});

router.delete('/:id/destroyCartRow', (req, res) => {
	const id = req.params.id;
	const productId = req.body.productId;
	cartService.destroyCartRow(id, productId).then((result) => {
		res.status(result.status).json(result.data);
	});
});

router.delete('/:id', (req, res) => {
	const id = req.params.id;
	cartService.destroy(id).then((result) => {
		res.status(result.status).json(result.data);
	});
});


module.exports = router;