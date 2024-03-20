const router = require('express').Router();
const userService = require('../services/userService');

router.get('/', (req, res) => {
    userService.getAll().then(result => {
        res.status(result.status).json(result.data);
    });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    userService.getById(id).then(result => {
        res.status(result.status).json(result.data);
    });
});

router.get('/:id/:getCart', (req, res) => {
    const id = req.params.id;
    const cart = req.body;
    userService.getCart(id, cart).then(result => {
        res.status(result.status).json(result.data);
    });
});

router.post('/', (req, res) => {
    const user = req.body;
    userService.create(user).then(result => {
        res.status(result.status).json(result.data);
    });
});

router.put('/', (req, res) => {
    const user = req.body;
    const id = user.id;
    userService.update(user, id).then(result => {
        res.status(result.status).json(result.data);
    })
});

router.delete('/', (req, res) => {
    const id = user.id;
    userService.destroy(id).then(result => {
        res.status(result.status).json(result.data);
    })
});

module.exports = router;
