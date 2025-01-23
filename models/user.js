const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
email: {
     type: String,
     required: [true, 'Email is required.'],
     match: [/.+\@.+\..+/, 'Please provide a valid email address.'],
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('User', userSchema);
