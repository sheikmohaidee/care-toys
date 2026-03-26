const express = require('express');
const { check } = require('express-validator');
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/product.controller');
const { protect, admin } = require('../middleware/auth.middleware');
const { validate } = require('../middleware/validate.middleware');

const router = express.Router();

const productValidation = [
  check('name', 'Name is required').not().isEmpty(),
  check('price', 'Price must be a positive number').isFloat({ min: 0 }),
  validate
];

router.route('/')
  .get(getProducts)
  .post(protect, admin, productValidation, createProduct);

router.route('/:id')
  .get(getProductById)
  .put(protect, admin, productValidation, updateProduct)
  .delete(protect, admin, deleteProduct);

module.exports = router;
