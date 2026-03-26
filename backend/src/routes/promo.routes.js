const express = require('express');
const { getCoupons, getDeals, getDrops } = require('../controllers/promo.controller');

const router = express.Router();
router.get('/coupons', getCoupons);
router.get('/deals', getDeals);
router.get('/drops', getDrops);

module.exports = router;
