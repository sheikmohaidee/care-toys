const pool = require('../config/db');

exports.getCart = async (req, res) => {
  try {
    const [cartItems] = await pool.query(`SELECT c.id as cart_item_id, c.quantity, p.* FROM CartItems c JOIN Products p ON c.product_id = p.id WHERE c.user_id = ?`, [req.user.id]);
    res.json({ success: true, data: cartItems });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.addToCart = async (req, res) => {
  const { product_id, quantity } = req.body;
  try {
    const [existing] = await pool.query('SELECT * FROM CartItems WHERE user_id = ? AND product_id = ?', [req.user.id, product_id]);
    if (existing.length > 0) {
      await pool.query('UPDATE CartItems SET quantity = ? WHERE id = ?', [existing[0].quantity + (quantity || 1), existing[0].id]);
    } else {
      await pool.query('INSERT INTO CartItems (user_id, product_id, quantity) VALUES (?, ?, ?)', [req.user.id, product_id, quantity || 1]);
    }
    res.status(201).json({ success: true, message: 'Cart updated' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const [result] = await pool.query('UPDATE CartItems SET quantity = ? WHERE id = ? AND user_id = ?', [req.body.quantity, req.params.id, req.user.id]);
    if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Cart item not found' });
    res.json({ success: true, message: 'Cart updated' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM CartItems WHERE id = ? AND user_id = ?', [req.params.id, req.user.id]);
    if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Cart item not found' });
    res.json({ success: true, message: 'Item removed' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
