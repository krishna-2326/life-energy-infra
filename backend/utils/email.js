const nodemailer = require('nodemailer');

const sendEmailNotification = async ({ subject, htmlText }) => {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, COMPANY_EMAIL } = process.env;

  if (!SMTP_USER || !SMTP_PASS) {
    console.log(`[Email Notification Skipped] SMTP credentials not set in .env. Subject: "${subject}"`);
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS
      }
    });

    const mailOptions = {
      from: `"Life Energy Infra Website" <${SMTP_USER}>`,
      to: COMPANY_EMAIL || 'lifeenergyinfra@gmail.com',
      subject: subject,
      html: htmlText
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`[Email Sent] MessageID: ${info.messageId}`);
  } catch (error) {
    console.error(`[Email Error] Failed to send email alert: ${error.message}`);
  }
};

module.exports = { sendEmailNotification };
