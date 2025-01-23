const Application = require('../models/application');
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

    res.status(201).json({ message: 'Applicant added successfully.', applicant: newApplicant });
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