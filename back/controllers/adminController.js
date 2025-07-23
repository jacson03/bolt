const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const MenuItem = require('../models/MenuItem');
const Order = require('../models/Order');

// Admin Authentication
const registerAdmin = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({
      where: {
        $or: [{ email }, { username }]
      }
    });

    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin with this email or username already exists' });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create admin
    const admin = await Admin.create({
      username,
      email,
      password: hashedPassword
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: admin.id, username: admin.username, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'Admin registered successfully',
      token,
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    console.error('Admin registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find admin
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: admin.id, username: admin.username, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

// Menu Item CRUD Operations
const createMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.create(req.body);
    res.status(201).json({ message: 'Menu item created successfully', menuItem });
  } catch (error) {
    console.error('Create menu item error:', error);
    res.status(500).json({ message: 'Error creating menu item' });
  }
};

const getAllMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(menuItems);
  } catch (error) {
    console.error('Get menu items error:', error);
    res.status(500).json({ message: 'Error fetching menu items' });
  }
};

const updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await MenuItem.update(req.body, {
      where: { id }
    });

    if (updated) {
      const updatedMenuItem = await MenuItem.findByPk(id);
      res.json({ message: 'Menu item updated successfully', menuItem: updatedMenuItem });
    } else {
      res.status(404).json({ message: 'Menu item not found' });
    }
  } catch (error) {
    console.error('Update menu item error:', error);
    res.status(500).json({ message: 'Error updating menu item' });
  }
};

const deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await MenuItem.destroy({
      where: { id }
    });

    if (deleted) {
      res.json({ message: 'Menu item deleted successfully' });
    } else {
      res.status(404).json({ message: 'Menu item not found' });
    }
  } catch (error) {
    console.error('Delete menu item error:', error);
    res.status(500).json({ message: 'Error deleting menu item' });
  }
};

// Order Management
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(orders);
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ message: 'Error fetching orders' });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const [updated] = await Order.update({ status }, {
      where: { id }
    });

    if (updated) {
      const updatedOrder = await Order.findByPk(id);
      res.json({ message: 'Order status updated successfully', order: updatedOrder });
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ message: 'Error updating order status' });
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
  createMenuItem,
  getAllMenuItems,
  updateMenuItem,
  deleteMenuItem,
  getAllOrders,
  updateOrderStatus
};