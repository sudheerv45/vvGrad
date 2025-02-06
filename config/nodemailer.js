const nodemailer = require('nodemailer');
require ('dotenv').config();

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // SMTP host for Outlook/Office 365
  port: 587,                 // Port for STARTTLS
  secure: false,             // Use STARTTLS (secure: false)
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS,    // Use the App Password if MFA is enabled
  },
  tls: {
    rejectUnauthorized: false, // Accept self-signed certificates (optional)
  },
});

module.exports = transporter;