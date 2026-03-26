const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { protect, admin } = require('../middleware/auth.middleware');

router.get('/stats', protect, admin, async (req, res) => {
    try {
        const [[productsCnt]] = await pool.query('SELECT COUNT(*) as cnt FROM Products');
        const [[ordersCnt]] = await pool.query('SELECT COUNT(*) as cnt FROM Orders');
        const [[usersCnt]] = await pool.query('SELECT COUNT(*) as cnt FROM Users');
        const [[revenue]] = await pool.query('SELECT SUM(total_amount) as total FROM Orders');
        const [[activeCoupons]] = await pool.query('SELECT COUNT(*) as cnt FROM Coupons WHERE is_active = 1');
        const [lowStock] = await pool.query('SELECT * FROM Products WHERE stock < 5 LIMIT 10');
        
        res.json({
            success: true, 
            data: {
                total_products: productsCnt.cnt,
                total_orders: ordersCnt.cnt,
                total_users: usersCnt.cnt,
                total_revenue: revenue.total || 0,
                active_coupons: activeCoupons.cnt,
                low_stock_items: lowStock
            }
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({ success: false, message: 'Server Analytics Error' });
    }
});

module.exports = router;
