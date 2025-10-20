require('dotenv').config();

const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');

const ConsumerModel = require('./models/consumers.js');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// MongoDB connection with connection pooling for serverless
let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log('Using existing database connection');
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_STRING, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    isConnected = db.connections[0].readyState === 1;
    console.log('New database connection established');
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
};

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ message: "API is running", status: "ok" });
});

app.get('/api', (req, res) => {
  res.json({ message: "API is running", status: "ok" });
});

// Login endpoint
app.post('/login', async (req, res) => {
  try {
    await connectDB();
    
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }
    
    const user = await ConsumerModel.findOne({ username: username });
    
    if (user) {
      if (user.password === password) {
        res.json({ status: "success", message: "Login successful" });
      } else {
        res.status(401).json({ status: "error", message: "Password did not match" });
      }
    } else {
      res.status(404).json({ status: "error", message: "User not found" });
    }
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Signup endpoint
app.post('/signup', async (req, res) => {
  try {
    await connectDB();
    
    const consumer = await ConsumerModel.create(req.body);
    res.status(201).json({ status: "success", data: consumer });
  } catch (err) {
    console.error('Signup error:', err);
    
    if (err.code === 11000) {
      res.status(400).json({ error: "Username already exists" });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Export for Vercel serverless
module.exports = app;