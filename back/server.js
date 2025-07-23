const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const { adminSequelize, userSequelize } = require('./config/database');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running successfully!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Database connection and server start
const startServer = async () => {
  try {
    // Test database connections
    await adminSequelize.authenticate();
    console.log('Admin database connection established successfully.');
    
    await userSequelize.authenticate();
    console.log('User database connection established successfully.');

    // Sync database models
    await adminSequelize.sync({ alter: true });
    console.log('Admin database synced successfully.');
    
    await userSequelize.sync({ alter: true });
    console.log('User database synced successfully.');

    // Start server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Admin API: http://localhost:${PORT}/api/admin`);
      console.log(`User API: http://localhost:${PORT}/api/user`);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
    process.exit(1);
  }
};

startServer();