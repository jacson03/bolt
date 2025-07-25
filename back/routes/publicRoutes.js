const express = require('express');
const router = express.Router();
const { getPublicMenuItems, getMenuCategories, getFeaturedItems } = require('../controllers/menuController');

// Public menu routes (no authentication required)
router.get('/menu', getPublicMenuItems);
router.get('/menu/categories', getMenuCategories);
router.get('/menu/featured', getFeaturedItems);

// Health check
router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

module.exports = router;