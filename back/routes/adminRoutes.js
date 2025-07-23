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

// Admin Authentication Routes
router.post('/register', registerAdmin);
router.post('/login', loginAdmin);

// Menu Item Management Routes (Protected)
router.post('/menu-items', authenticateAdmin, createMenuItem);
router.get('/menu-items', authenticateAdmin, getAllMenuItems);
router.put('/menu-items/:id', authenticateAdmin, updateMenuItem);
router.delete('/menu-items/:id', authenticateAdmin, deleteMenuItem);

// Order Management Routes (Protected)
router.get('/orders', authenticateAdmin, getAllOrders);
router.put('/orders/:id/status', authenticateAdmin, updateOrderStatus);

module.exports = router;