const pool = require('../config/db');

exports.getCoupons = async (req, res) => {
    try {
        const [coupons] = await pool.query('SELECT * FROM Coupons');
        res.json({ success: true, data: coupons });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

exports.createCoupon = async (req, res) => {
    const { code, discount_type, discount_value, expiry_date, title, description, bg_color, badge_text, image_url, is_active } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO Coupons (code, discount_type, discount_value, expiry_date, title, description, bg_color, badge_text, image_url, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [code, discount_type || 'percentage', discount_value, expiry_date, title, description, bg_color, badge_text, image_url, is_active !== undefined ? is_active : true]
        );
        res.status(201).json({ success: true, data: { id: result.insertId, ...req.body } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

exports.updateCoupon = async (req, res) => {
    const { code, discount_type, discount_value, expiry_date, title, description, bg_color, badge_text, image_url, is_active } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE Coupons SET code=?, discount_type=?, discount_value=?, expiry_date=?, title=?, description=?, bg_color=?, badge_text=?, image_url=?, is_active=? WHERE id=?',
            [code, discount_type, discount_value, expiry_date, title, description, bg_color, badge_text, image_url, is_active, req.params.id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Coupon not found' });
        res.json({ success: true, message: 'Coupon updated' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

exports.deleteCoupon = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM Coupons WHERE id=?', [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Coupon not found' });
        res.json({ success: true, message: 'Coupon deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
