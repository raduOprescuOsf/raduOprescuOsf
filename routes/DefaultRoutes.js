const express = require('express');
const routes = express.Router();
const defaultController = require('../controllers/DefaultController');
const cartController = require('../controllers/CartController');
const wishlistController = require('../controllers/WishlistController');

// Home page

routes.get('/', defaultController.getHome);

// Gender page

routes.get('/categories/:id', defaultController.getGender)

// Categories page

routes.get('/categories/:parent_category_id/:id', defaultController.getCategories);

// Product page

routes.get('/categories/womens/:primary_category_id/:id', defaultController.getProductsCategory);
routes.get('/categories/mens/:primary_category_id/:id', defaultController.getProductsCategory);

routes.get('/categories/:primary_category_id/:id', defaultController.getProductId);

// For controlling the cart(CRUD operation on data)

routes.post('/categories/:primary_category_id/addProduct', cartController.addProduct);
routes.post('/removeProduct', cartController.removeProduct);
routes.post('/updateCart', cartController.updateQuantity);

// For controlling the wishlist(CRUD operation on data)

routes.post('/categories/:primary_category_id/addWishlist', wishlistController.addWishedProduct);
routes.post('/removeWishlist', wishlistController.removeWishedProduct);
routes.post('/updateWishlist', wishlistController.updateWishedQuantity);


module.exports = routes;
