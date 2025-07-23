const { Sequelize } = require('sequelize');
const path = require('path');
const fs = require('fs');

// Ensure databases directory exists
const dbDir = path.join(__dirname, '../databases');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
  console.log('Created databases directory');
}

// Create separate databases for admin and user
const adminSequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../databases/admin.sqlite'),
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  define: {
    timestamps: true,
    underscored: false,
  },
});

const userSequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../databases/user.sqlite'),
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  define: {
    timestamps: true,
    underscored: false,
  },
});

// Test connections
const testConnections = async () => {
  try {
    await adminSequelize.authenticate();
    console.log('✅ Admin database connection established successfully.');
    
    await userSequelize.authenticate();
    console.log('✅ User database connection established successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to databases:', error);
  }
};

// Test connections on startup
testConnections();

module.exports = {
  adminSequelize,
  userSequelize
};