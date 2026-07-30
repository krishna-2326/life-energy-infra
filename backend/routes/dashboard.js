const express = require('express');
const router = express.Router();
const ContactSubmission = require('../models/ContactSubmission');
const Application = require('../models/Application');
const Service = require('../models/Service');
const Project = require('../models/Project');
const Career = require('../models/Career');
const { protectAdmin } = require('../middleware/authMiddleware');

// GET /api/dashboard/stats - Admin dashboard metrics
router.get('/stats', protectAdmin, async (req, res) => {
  try {
    const totalInquiries = await ContactSubmission.countDocuments();
    const newInquiries = await ContactSubmission.countDocuments({ status: 'New' });

    const totalApplications = await Application.countDocuments();
    const newApplications = await Application.countDocuments({ status: 'New' });

    const activeServices = await Service.countDocuments({ isActive: true });
    const totalProjects = await Project.countDocuments();
    const openCareers = await Career.countDocuments({ isActive: true });

    res.json({
      success: true,
      data: {
        totalInquiries,
        newInquiries,
        totalApplications,
        newApplications,
        activeServices,
        totalProjects,
        openCareers
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
