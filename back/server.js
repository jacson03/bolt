const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '.env') });

const { adminSequelize, userSequelize } = require('./config/database');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:8080',
      'http://localhost:3000', 
      'http://localhost:5173',
      'http://127.0.0.1:8080',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:5173'
    ];
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('Blocked by CORS:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Handle preflight requests
app.options('*', cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'Server is running successfully!',
    timestamp: new Date().toISOString(),
    port: PORT
  });
});

// Test route for debugging
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'Test endpoint working',
    cors: 'enabled',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
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
      console.log(`Health check: http://localhost:${PORT}/api/health`);
      console.log(`Admin API: http://localhost:${PORT}/api/admin`);
      console.log(`User API: http://localhost:${PORT}/api/user`);
      console.log('Environment:', process.env.NODE_ENV || 'development');
    });
  } catch (error) {
    console.error('Unable to start server:', error);
    process.exit(1);
  }
};

startServer();