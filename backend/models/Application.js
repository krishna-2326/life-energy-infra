const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  positionAppliedFor: {
    type: String,
    required: true,
    trim: true
  },
  resumeLink: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['New', 'Read', 'Responded'],
    default: 'New'
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
