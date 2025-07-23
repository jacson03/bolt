const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const User = require('../models/User');

const authenticateAdmin = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    console.log('Admin auth attempt, token present:', !!token);
    
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not configured');
      return res.status(500).json({ message: 'Server configuration error' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findByPk(decoded.id);
    
    if (!admin || !admin.isActive) {
      return res.status(401).json({ message: 'Invalid token or admin not active.' });
    }

    req.admin = admin;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token.' });
  }
};

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    console.log('User auth attempt, token present:', !!token);
    
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not configured');
      return res.status(500).json({ message: 'Server configuration error' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);
    
    if (!user || !user.isActive) {
      return res.status(401).json({ message: 'Invalid token or user not active.' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token.' });
  }
};

module.exports = {
  authenticateAdmin,
  authenticateUser
};