const mongoose = require('mongoose');
 
// Define the Application schema
const applicationSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      maxlength: 255,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    experienceInYears: {
      type: Number,
      required: true,
      min: 0,
    },
    dreamCompany: {
      type: String,
      required: true,
    },
    topicsOfInterest: {
      type: [String],
      required: true,
    },
    occupation: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);
// Export the Application model
const Application = mongoose.model('Application', applicationSchema);
 
module.exports = Application;