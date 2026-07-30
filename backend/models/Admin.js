const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'admin'
  },
  name: {
    type: String,
    default: 'System Administrator'
  }
}, { timestamps: true });

module.exports = mongoose.model('Admin', adminSchema);
