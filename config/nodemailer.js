//for outlook
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'info@bluelinemd.com',
    pass: 'cPmOCoOu0a81sagbq_883097',
  },
  tls: {
    ciphers: 'SSLv3',
  },
});

module.exports = transporter;