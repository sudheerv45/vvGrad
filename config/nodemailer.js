//for outlook
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'marketing@vvgrad.com',
    pass: 'uwjw yvmh mfrj rvsy',
  },
  tls: {
    ciphers: 'SSLv3',
  },
});

module.exports = transporter;