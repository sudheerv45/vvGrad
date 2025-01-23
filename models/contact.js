const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required.'],
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    match: [/.+\@.+\..+/, 'Please provide a valid email address.'],
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required.'],
  },
  message: {
    type: String,
    required: [true, 'Message is required.'],
  },
}, { timestamps: true });

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
