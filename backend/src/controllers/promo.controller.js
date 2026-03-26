const pool = require('../config/db');

exports.getCoupons = async (req, res) => {
  try {
    const [coupons] = await pool.query('SELECT * FROM Coupons WHERE valid_until > NOW()');
    res.json({ success: true, data: coupons });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.getDeals = async (req, res) => {
  try {
    const [deals] = await pool.query('SELECT d.*, p.name as product_name, p.image_url FROM Deals d JOIN Products p ON d.product_id = p.id WHERE d.valid_until > NOW()');
    res.json({ success: true, data: deals });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.getDrops = async (req, res) => {
  try {
    const [drops] = await pool.query('SELECT * FROM Drops ORDER BY launch_date ASC');
    res.json({ success: true, data: drops });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
