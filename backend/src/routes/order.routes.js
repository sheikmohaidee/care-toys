const express = require('express');
const { createOrder, getUserOrders, getOrderDetails, getAllGlobalOrders, updateOrderStatus } = require('../controllers/order.controller');
const { protect, admin } = require('../middleware/auth.middleware');

const router = express.Router();

// STRICTLY ADMIN ENDPOINTS (Protected Explicitly)
router.route('/all').get(protect, admin, getAllGlobalOrders);
router.route('/:id/status').put(protect, admin, updateOrderStatus);

// STANDARD CONSUMER ENDPOINTS (Global Auth Protected)
router.use(protect);
router.route('/').post(createOrder).get(getUserOrders);
router.route('/:id').get(getOrderDetails);

module.exports = router;
