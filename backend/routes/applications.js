const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const { protectAdmin } = require('../middleware/authMiddleware');
const { sendEmailNotification } = require('../utils/email');

// POST /api/applications - Public form submission
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, positionAppliedFor, resumeLink, message } = req.body;

    if (!name || !email || !phone || !positionAppliedFor || !resumeLink) {
      return res.status(400).json({ success: false, message: 'Please fill in all required fields (Name, Email, Phone, Position, Resume Link)' });
    }

    const application = await Application.create({
      name,
      email,
      phone,
      positionAppliedFor,
      resumeLink,
      message: message || '',
      status: 'New'
    });

    // Send email alert asynchronously
    sendEmailNotification({
      subject: `[Life Energy Infra] New Career Application: ${positionAppliedFor} - ${name}`,
      htmlText: `
        <h2>New Application Submitted</h2>
        <p><strong>Applicant Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Position Applied For:</strong> ${positionAppliedFor}</p>
        <p><strong>Resume Link:</strong> <a href="${resumeLink}" target="_blank">${resumeLink}</a></p>
        <p><strong>Message / Cover Note:</strong> ${message || 'N/A'}</p>
      `
    });

    res.status(201).json({ success: true, message: 'Application submitted successfully! Our team will get in touch.', data: application });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// GET /api/applications - Admin list all applications
router.get('/', protectAdmin, async (req, res) => {
  try {
    const applications = await Application.find().sort({ submittedAt: -1 });
    res.json({ success: true, count: applications.length, data: applications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/applications/:id - Admin update application status
router.put('/:id', protectAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    if (!['New', 'Read', 'Responded'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!application) return res.status(404).json({ success: false, message: 'Application not found' });
    res.json({ success: true, data: application });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE /api/applications/:id - Admin delete application
router.delete('/:id', protectAdmin, async (req, res) => {
  try {
    const application = await Application.findByIdAndDelete(req.params.id);
    if (!application) return res.status(404).json({ success: false, message: 'Application not found' });
    res.json({ success: true, message: 'Application record deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
