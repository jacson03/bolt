const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  createOrder,
  getUserOrders,
  cancelOrder
} = require('../controllers/userController');
const { authenticateUser } = require('../middleware/auth');

// User Authentication Routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// User Profile Routes (Protected)
router.get('/profile', authenticateUser, getUserProfile);
router.put('/profile', authenticateUser, updateUserProfile);

// Order Routes (Protected)
router.post('/orders', authenticateUser, createOrder);
router.get('/orders', authenticateUser, getUserOrders);
router.put('/orders/:id/cancel', authenticateUser, cancelOrder);

module.exports = router;