const pool = require('../config/db');

exports.getProducts = async (req, res) => {
  try {
    const [products] = await pool.query('SELECT * FROM Products');
    res.json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const [products] = await pool.query('SELECT * FROM Products WHERE id = ?', [req.params.id]);
    if (products.length === 0) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, data: products[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.createProduct = async (req, res) => {
  const { name, description, price, stock, category_id, image_url, isLimited, isDeal, isCollector } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO Products (name, description, price, stock, category_id, image_url, isLimited, isDeal, isCollector) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [name, description, price, stock, category_id, image_url, isLimited ? 1 : 0, isDeal ? 1 : 0, isCollector ? 1 : 0]
    );
    res.status(201).json({ success: true, data: { id: result.insertId, ...req.body } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.updateProduct = async (req, res) => {
  const { name, description, price, stock, category_id, image_url, isLimited, isDeal, isCollector } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE Products SET name=?, description=?, price=?, stock=?, category_id=?, image_url=?, isLimited=?, isDeal=?, isCollector=? WHERE id=?',
      [name, description, price, stock, category_id, image_url, isLimited ? 1 : 0, isDeal ? 1 : 0, isCollector ? 1 : 0, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, message: 'Product updated' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM Products WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
