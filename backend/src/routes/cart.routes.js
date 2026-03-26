const express = require('express');
const { getCart, addToCart, updateCartItem, removeFromCart } = require('../controllers/cart.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();
router.use(protect);
router.route('/').get(getCart).post(addToCart);
router.route('/:id').put(updateCartItem).delete(removeFromCart);

module.exports = router;
