const express = require('express');
const { getSettings, updateSettings } = require('../controllers/settings.controller');
const { protect, admin } = require('../middleware/auth.middleware');

const router = express.Router();

router.route('/')
  .get(getSettings) // GET should theoretically be accessible globally without auth since the checkout page needs to read the WhatsApp number.
  .put(protect, admin, updateSettings);

module.exports = router;
