const express = require('express');
const { getCoupons, createCoupon, updateCoupon, deleteCoupon } = require('../controllers/coupon.controller');
const { protect, admin } = require('../middleware/auth.middleware');

const router = express.Router();

router.route('/')
  .get(getCoupons)
  .post(protect, admin, createCoupon);

router.route('/:id')
  .put(protect, admin, updateCoupon)
  .delete(protect, admin, deleteCoupon);

module.exports = router;
