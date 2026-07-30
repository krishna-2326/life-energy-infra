const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const { protectAdmin } = require('../middleware/authMiddleware');

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    if (mongoose.connection.readyState !== 1) {
      return res.status(500).json({ 
        success: false, 
        message: 'Database connection is not active. Please check MONGO_URI in your Render environment variables.' 
      });
    }

    // Auto-seed if database is empty
    let adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      console.log('[Auto-Seed] Empty database detected on login attempt. Seeding database automatically...');
      const { runSeeder } = require('./seed');
      await runSeeder();
      console.log('[Auto-Seed] Initial database seeding completed!');
    }

    const admin = await Admin.findOne({ email: email.toLowerCase().trim() });
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET || 'super_secret_jwt_key_life_energy_infra_2026_change_in_production',
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.json({
      success: true,
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    console.error('[Login Error]', error);
    res.status(500).json({ success: false, message: `Login error: ${error.message}` });
  }
});

// GET /api/auth/me
router.get('/me', protectAdmin, (req, res) => {
  res.json({
    success: true,
    admin: req.admin
  });
});

module.exports = router;
