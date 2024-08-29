const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  practiceName: { type: String, required: true },
  email: { type: String },
  phone: { type: String, required: true },
  specialty: { type: String, required: true },
  role: { type: String, required: true }, // I am a
  productInterest: { type: String, required: true },
  numberOfProviders: { type: Number, required: true }
});

module.exports = mongoose.model('Contact', ContactSchema);