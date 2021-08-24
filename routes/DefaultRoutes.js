const express = require('express');
const routes = express.Router();
const defaultController = require('../controllers/DefaultController');


// Home page

routes.get('/', defaultController.getHome);

// Gender page

routes.get('/categories/:id', defaultController.getGender)

// Categories page

routes.get('/categories/:parent_category_id/:id', defaultController.getCategories);

// Product page

routes.get('/categories/womens/:primary_category_id/:id', defaultController.getProductsCategory);
routes.get('/categories/mens/:primary_category_id/:id', defaultController.getProductsCategory);

routes.get('/categories/:gender/:parent/:primary_category_id/:id', defaultController.getProductId);

module.exports = routes;
