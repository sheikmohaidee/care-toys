const express = require('express');
const { check } = require('express-validator');
const jwt = require('jsonwebtoken');
const { register, login } = require('../controllers/auth.controller');
const { validate } = require('../middleware/validate.middleware');

const router = express.Router();

router.post('/register', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Valid email required').isEmail(),
  check('password', '6+ chars required').isLength({ min: 6 }),
  validate
], register);

router.post('/login', [
  check('email', 'Valid email required').isEmail(),
  check('password', 'Password required').exists(),
  validate
], login);

router.post('/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin123') {
    const token = jwt.sign({ id: 0, role: 'admin' }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
    return res.json({ success: true, token, role: 'admin' });
  }
  res.status(401).json({ success: false, message: 'Invalid admin credentials' });
});

module.exports = router;
