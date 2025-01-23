const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // SMTP host for Outlook/Office 365
  port: 587,                 // Port for STARTTLS
  secure: false,             // Use STARTTLS (secure: false)
  auth: {
    user: 'marketing@vvgrad.com', // Your email
    pass: 'uwjw yvmh mfrj rvsy',    // Use the App Password if MFA is enabled
  },
  tls: {
    rejectUnauthorized: false, // Accept self-signed certificates (optional)
  },
});

module.exports = transporter;