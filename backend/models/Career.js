const mongoose = require('mongoose');

const careerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['Internship', 'Full-time', 'Part-time', 'Contract'],
    default: 'Internship'
  },
  location: {
    type: String,
    default: 'Pune, Maharashtra / Hybrid'
  },
  department: {
    type: String,
    default: 'Engineering & Operations'
  },
  description: {
    type: String,
    required: true
  },
  requirements: [{
    type: String
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  postedDate: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Career', careerSchema);
