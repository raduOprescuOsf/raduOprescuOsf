const express = require('express');
const routes = express.Router();
const cartController = require('../controllers/CartController');


routes.get('/', cartController.getCart);

routes.post('/removeCart', cartController.removeProduct);

routes.post('/updateCart', cartController.updateQuantity);

module.exports = routes;