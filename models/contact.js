const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true,},
  phone: { type: String, required: true },
  message: { type: String, required: true}
});

module.exports = mongoose.model('Contact', ContactSchema);