const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const { protectAdmin } = require('../middleware/authMiddleware');

// GET /api/services - Public list active services
router.get('/', async (req, res) => {
  try {
    let count = await Service.countDocuments();
    if (count === 0) {
      console.log('[Auto-Seed] Empty services collection detected. Auto-seeding database...');
      const { runSeeder } = require('./seed');
      await runSeeder();
    }
    const services = await Service.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, count: services.length, data: services });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/services/all - Admin list all services (including inactive)
router.get('/all', protectAdmin, async (req, res) => {
  try {
    const services = await Service.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, count: services.length, data: services });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/services - Admin create service
router.post('/', protectAdmin, async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json({ success: true, data: service });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// PUT /api/services/:id - Admin update service
router.put('/:id', protectAdmin, async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!service) return res.status(404).json({ success: false, message: 'Service not found' });
    res.json({ success: true, data: service });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE /api/services/:id - Admin delete service
router.delete('/:id', protectAdmin, async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ success: false, message: 'Service not found' });
    res.json({ success: true, message: 'Service removed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
