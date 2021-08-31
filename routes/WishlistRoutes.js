const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/WishlistController');

router.get('/', wishlistController.getWishlist);

router.post('/removeWishlist', wishlistController.removeWishedProduct);

router.post('/updateWishlist', wishlistController.updateWishedQuantity);


module.exports = router;
