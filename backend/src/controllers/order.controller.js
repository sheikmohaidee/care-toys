const pool = require('../config/db');

exports.createOrder = async (req, res) => {
  const { items, total_amount, customer_name, customer_phone, customer_address, customer_city } = req.body;
  if (!items || items.length === 0) return res.status(400).json({ success: false, message: 'No items in order' });

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const [orderResult] = await connection.query(
        'INSERT INTO Orders (user_id, total_amount, customer_name, customer_phone, customer_address, customer_city) VALUES (?, ?, ?, ?, ?, ?)', 
        [req.user.id, total_amount, customer_name, customer_phone, customer_address, customer_city]
    );
    const orderId = orderResult.insertId;

    for (const item of items) {
      await connection.query('INSERT INTO OrderItems (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)', [orderId, item.product_id, item.quantity, item.price]);
    }
    
    await connection.query('DELETE FROM CartItems WHERE user_id = ?', [req.user.id]);
    await connection.commit();
    res.status(201).json({ success: true, data: { order_id: orderId, total_amount, status: 'pending' } });
  } catch (error) {
    await connection.rollback();
    res.status(500).json({ success: false, message: 'Server Error' });
  } finally {
    connection.release();
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const [orders] = await pool.query('SELECT * FROM Orders WHERE user_id = ? ORDER BY created_at DESC', [req.user.id]);
    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.getOrderDetails = async (req, res) => {
  try {
    // Determine admin status natively vs explicitly logged users
    const [orders] = await pool.query('SELECT * FROM Orders WHERE id = ?', [req.params.id]);
    if (orders.length === 0) return res.status(404).json({ success: false, message: 'Order not found' });
    
    // Safety boundaries
    if (req.user.role !== 'admin' && orders[0].user_id !== req.user.id) {
        return res.status(403).json({ success: false, message: 'Unauthorized Access' });
    }

    const [items] = await pool.query('SELECT oi.*, p.name, p.image_url FROM OrderItems oi JOIN Products p ON oi.product_id = p.id WHERE oi.order_id = ?', [req.params.id]);
    res.json({ success: true, data: { ...orders[0], items } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// --- STRICTLY ADMIN CONTROLLERS --- 

exports.getAllGlobalOrders = async (req, res) => {
    try {
        const [orders] = await pool.query('SELECT Orders.*, Users.name as account_name FROM Orders LEFT JOIN Users ON Orders.user_id = Users.id ORDER BY created_at DESC');
        res.json({ success: true, data: orders });
    } catch (e) {
        console.error(e);
        res.status(500).json({ success: false, message: 'Server Order Fetch Error' });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const [result] = await pool.query('UPDATE Orders SET status = ? WHERE id = ?', [status, req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Order not found' });
        res.json({ success: true, message: 'Order Status Logged' });
    } catch (e) {
        console.error(e);
        res.status(500).json({ success: false, message: 'Server Update Error' });
    }
};
