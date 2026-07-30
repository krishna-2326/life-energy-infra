require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Database connection
connectDB();

// API Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    company: 'Life Energy Infra Private Limited',
    cin: 'U70109PN2021PTC202308',
    timestamp: new Date().toISOString()
  });
});

// Register API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/services', require('./routes/services'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/careers', require('./routes/careers'));
app.use('/api/applications', require('./routes/applications'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/team', require('./routes/team'));
app.use('/api/dashboard', require('./routes/dashboard'));

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route not found: ${req.originalUrl}` });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Global Error]', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`[Express Server] Life Energy Infra API running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});
