const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sequelize = require('./db');

const app = express();
const PORT = 4000;
const JWT_SECRET = 'supersecretkey'; // In production, use env vars

app.use(cors());
app.use(express.json());

// In-memory user store
const users = [];
const connectToDb=async()=>{
  await sequelize.authenticate()
  console.log("connected to db")
}



app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
}); 