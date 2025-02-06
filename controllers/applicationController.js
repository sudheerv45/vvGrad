const Application = require('../models/application');
const nodemailer = require('nodemailer');
require ('dotenv').config();

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: process.env.EMAIL_USER, // Your Gmail
      pass: process.env.EMAIL_PASS  // App password (not Gmail password)
  }
});

const createApplication = async (req, res) => {
  try {
    const {
      fullName,
      emailId,
      phoneNumber,
      companyName,
      experienceInYears,
      dreamCompany,
      topicsOfInterest,
      occupation,
    } = req.body;

    // Validate required fields
    if (!fullName || !emailId || !phoneNumber || !companyName || !experienceInYears || !dreamCompany || !topicsOfInterest || !occupation) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Create a new application entry
    const newApplicant = new Application({
      fullName,
      emailId,
      phoneNumber,
      companyName,
      experienceInYears,
      dreamCompany,
      topicsOfInterest,
      occupation,
    });

    // Save the application to the database
    await newApplicant.save();

     // Email to Applicant
     const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: emailId,
      subject: "Application Submitted Successfully",
      html: `
          <p>Dear ${fullName},</p>
          <p>Thank you for applying. We have received your application.</p>
          <p>Details:</p>
          <ul>
              <li><strong>Full Name:</strong> ${fullName}</li>
              <li><strong>Email:</strong> ${emailId}</li>
              <li><strong>Phone:</strong> ${phoneNumber}</li>
              <li><strong>Company:</strong> ${companyName}</li>
              <li><strong>Experience:</strong> ${experienceInYears} years</li>
              <li><strong>Dream Company:</strong> ${dreamCompany}</li>
              <li><strong>Topics of Interest:</strong> ${topicsOfInterest}</li>
              <li><strong>Occupation:</strong> ${occupation}</li>
          </ul>
          <p>We will review your application and get back to you soon.</p>
          <p>Best Regards,</p>
          <p>Team</p>
      `
  };

  // Email to Admin
  const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL, // Admin Email from .env
      subject: "New Application Received",
      html: `
          <p>Admin,</p>
          <p>A new application has been submitted.</p>
          <p>Details:</p>
          <ul>
              <li><strong>Full Name:</strong> ${fullName}</li>
              <li><strong>Email:</strong> ${emailId}</li>
              <li><strong>Phone:</strong> ${phoneNumber}</li>
              <li><strong>Company:</strong> ${companyName}</li>
              <li><strong>Experience:</strong> ${experienceInYears} years</li>
              <li><strong>Dream Company:</strong> ${dreamCompany}</li>
              <li><strong>Topics of Interest:</strong> ${topicsOfInterest}</li>
              <li><strong>Occupation:</strong> ${occupation}</li>
          </ul>
          <p>Please review the application.</p>
          <p>Best Regards,</p>
          <p>System Notification</p>
      `
  };

  // Send Emails
  await transporter.sendMail(userMailOptions);
  await transporter.sendMail(adminMailOptions);

  res.status(201).json({ message: 'Applicant added successfully and emails sent.', applicant: newApplicant });

} catch (err) {
  console.error(err);
  res.status(500).json({ error: 'Something went wrong. Please try again later.' });
}
};

// Update an existing application by id
const updateApplicationById = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
    
        const application = await Application.findByIdAndUpdate(
          id,
          updateData,
          { new: true, runValidators: true } // Return the updated document and validate the data
        );
    
        if (!application) {
          return res.status(404).json({ success: false, message: 'Application not found' });
        }
    
        res.status(200).json({ success: true, application });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
};
 
// Get an application by ID
const getApplicationById = async (req, res) => {
  try {
    const { id } = req.params;
    const application = await Application.findById(id);
    if (!application || application.isDeleted) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }
    res.status(200).json({ success: true, application });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
 
// Get all applications
const getApplications = async (req, res) => {
  try {
    const applications = await Application.find({ isDeleted: false });
    res.status(200).json({ success: true, applications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
 
// Soft delete an application by ID
const deleteApplicationById = async (req, res) => {
  try {
    const { id } = req.params;
    const application = await Application.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );
    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }
    res.status(200).json({ success: true, application });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
 
// Restore an application by ID
const restoreApplicationById = async (req, res) => {
  try {
    const { id } = req.params;
    const application = await Application.findByIdAndUpdate(
      id,
      { isDeleted: false },
      { new: true }
    );
    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found or not deleted' });
    }
    res.status(200).json({ success: true, application });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
 
module.exports = {
  createApplication,
  updateApplicationById,
  getApplicationById,
  getApplications,
  deleteApplicationById,
  restoreApplicationById
}