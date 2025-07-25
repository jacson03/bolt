const express = require('express');
const router = express.Router();
const {
  registerAdmin,
  loginAdmin,
  createMenuItem,
  getAllMenuItems,
  updateMenuItem,
  deleteMenuItem,
  getAllOrders,
  updateOrderStatus
} = require('../controllers/adminController');
const { authenticateAdmin } = require('../middleware/auth');
const { 
  validateAdminRegistration, 
  validateUserLogin, 
  validateMenuItem,
  validateRequest 
} = require('../middleware/validation');

// Admin Authentication Routes
router.post('/register', validateAdminRegistration, registerAdmin);
router.post('/login', validateUserLogin, loginAdmin);

// Menu Item Management Routes (Protected)
router.post('/menu-items', authenticateAdmin, validateMenuItem, createMenuItem);
router.get('/menu-items', authenticateAdmin, getAllMenuItems);
router.put('/menu-items/:id', authenticateAdmin, validateMenuItem, updateMenuItem);
router.delete('/menu-items/:id', authenticateAdmin, deleteMenuItem);

// Order Management Routes (Protected)
router.get('/orders', authenticateAdmin, getAllOrders);
router.put('/orders/:id/status', authenticateAdmin, updateOrderStatus);

module.exports = router;