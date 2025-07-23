const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Order = require('../models/Order');

// User Authentication
const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    
    console.log('User registration attempt:', { name, email });

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      address
    });

    // Generate JWT token
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not configured');
    }
    
    const token = jwt.sign(
      { id: user.id, email: user.email, role: 'user' },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address
      }
    });
  } catch (error) {
    console.error('User registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log('User login attempt:', { email });

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not configured');
    }
    
    const token = jwt.sign(
      { id: user.id, email: user.email, role: 'user' },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address
      }
    });
  } catch (error) {
    console.error('User login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

// User Profile Management
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });
    res.json(user);
  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({ message: 'Error fetching user profile' });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const { name, phone, address } = req.body;
    const [updated] = await User.update(
      { name, phone, address },
      { where: { id: req.user.id } }
    );

    if (updated) {
      const updatedUser = await User.findByPk(req.user.id, {
        attributes: { exclude: ['password'] }
      });
      res.json({ message: 'Profile updated successfully', user: updatedUser });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Update user profile error:', error);
    res.status(500).json({ message: 'Error updating profile' });
  }
};

// Order Management
const createOrder = async (req, res) => {
  try {
    const { items, totalAmount, deliveryAddress, customerName, customerPhone } = req.body;
    
    const order = await Order.create({
      userId: req.user.id,
      items,
      totalAmount,
      deliveryAddress,
      customerName,
      customerPhone
    });

    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ message: 'Error creating order' });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']]
    });
    res.json(orders);
  } catch (error) {
    console.error('Get user orders error:', error);
    res.status(500).json({ message: 'Error fetching orders' });
  }
};

const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;
    
    const order = await Order.findOne({
      where: { id, userId: req.user.id }
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.status === 'delivered' || order.status === 'cancelled') {
      return res.status(400).json({ message: 'Cannot cancel this order' });
    }

    await Order.update(
      { status: 'cancelled' },
      { where: { id, userId: req.user.id } }
    );

    res.json({ message: 'Order cancelled successfully' });
  } catch (error) {
    console.error('Cancel order error:', error);
    res.status(500).json({ message: 'Error cancelling order' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  createOrder,
  getUserOrders,
  cancelOrder
};