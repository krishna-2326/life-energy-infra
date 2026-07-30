const express = require('express');
const router = express.Router();
const Career = require('../models/Career');
const { protectAdmin } = require('../middleware/authMiddleware');

// GET /api/careers - Public list active job/internship postings
router.get('/', async (req, res) => {
  try {
    const careers = await Career.find({ isActive: true }).sort({ postedDate: -1 });
    res.json({ success: true, count: careers.length, data: careers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/careers/all - Admin list all job postings (including inactive)
router.get('/all', protectAdmin, async (req, res) => {
  try {
    const careers = await Career.find().sort({ postedDate: -1 });
    res.json({ success: true, count: careers.length, data: careers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/careers - Admin create posting
router.post('/', protectAdmin, async (req, res) => {
  try {
    const career = await Career.create(req.body);
    res.status(201).json({ success: true, data: career });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// PUT /api/careers/:id - Admin update posting
router.put('/:id', protectAdmin, async (req, res) => {
  try {
    const career = await Career.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!career) return res.status(404).json({ success: false, message: 'Career posting not found' });
    res.json({ success: true, data: career });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE /api/careers/:id - Admin delete posting
router.delete('/:id', protectAdmin, async (req, res) => {
  try {
    const career = await Career.findByIdAndDelete(req.params.id);
    if (!career) return res.status(404).json({ success: false, message: 'Career posting not found' });
    res.json({ success: true, message: 'Career posting deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
