const express = require('express');
const router = express.Router();
const TeamMember = require('../models/TeamMember');
const { protectAdmin } = require('../middleware/authMiddleware');

// GET /api/team - Public list leadership & team
router.get('/', async (req, res) => {
  try {
    const team = await TeamMember.find().sort({ order: 1, createdAt: 1 });
    res.json({ success: true, count: team.length, data: team });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/team - Admin add team member
router.post('/', protectAdmin, async (req, res) => {
  try {
    const member = await TeamMember.create(req.body);
    res.status(201).json({ success: true, data: member });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// PUT /api/team/:id - Admin update team member
router.put('/:id', protectAdmin, async (req, res) => {
  try {
    const member = await TeamMember.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!member) return res.status(404).json({ success: false, message: 'Team member not found' });
    res.json({ success: true, data: member });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE /api/team/:id - Admin delete team member
router.delete('/:id', protectAdmin, async (req, res) => {
  try {
    const member = await TeamMember.findByIdAndDelete(req.params.id);
    if (!member) return res.status(404).json({ success: false, message: 'Team member not found' });
    res.json({ success: true, message: 'Team member removed' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
