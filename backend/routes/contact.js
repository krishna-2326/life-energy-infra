const express = require('express');
const router = express.Router();
const ContactSubmission = require('../models/ContactSubmission');
const { protectAdmin } = require('../middleware/authMiddleware');
const { sendEmailNotification } = require('../utils/email');

// POST /api/contact - Public contact form submission
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Please provide Name, Email, and Message' });
    }

    const contact = await ContactSubmission.create({
      name,
      email,
      phone: phone || '',
      subject: subject || 'General Inquiry',
      message,
      status: 'New'
    });

    // Send email alert asynchronously
    sendEmailNotification({
      subject: `[Life Energy Infra] New Contact Inquiry: ${subject || 'General'} - ${name}`,
      htmlText: `
        <h2>New Contact Inquiry Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <p><strong>Subject:</strong> ${subject || 'General Inquiry'}</p>
        <p><strong>Message:</strong> ${message}</p>
      `
    });

    res.status(201).json({ success: true, message: 'Inquiry received successfully! Thank you for reaching out.', data: contact });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// GET /api/contact - Admin list all contact submissions
router.get('/', protectAdmin, async (req, res) => {
  try {
    const submissions = await ContactSubmission.find().sort({ submittedAt: -1 });
    res.json({ success: true, count: submissions.length, data: submissions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/contact/:id - Admin update contact submission status
router.put('/:id', protectAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    if (!['New', 'Read', 'Responded'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }

    const contact = await ContactSubmission.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!contact) return res.status(404).json({ success: false, message: 'Contact inquiry not found' });
    res.json({ success: true, data: contact });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE /api/contact/:id - Admin delete contact inquiry
router.delete('/:id', protectAdmin, async (req, res) => {
  try {
    const contact = await ContactSubmission.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ success: false, message: 'Contact inquiry not found' });
    res.json({ success: true, message: 'Contact inquiry deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
