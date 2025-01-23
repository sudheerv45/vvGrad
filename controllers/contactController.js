const Contact = require('../models/contact');
const transporter = require('../config/nodemailer');

// Create a new contact
const createContact = async (req, res) => {
  try {
    const { fullName, email, phone, message } = req.body;

    // Check if the contact already exists based on email
    let contact = await Contact.findOne({ email });

    if (!contact) {
      // Create a new contact entry
      contact = new Contact({
        fullName,
        email,
        phone,
        message,
      });
      const sudheer=  await contact.save();
    }

    // Send confirmation email to the user
    const userMailOptions = {
      from: 'marketing@vvgrad.com',
      to: email,
      subject: 'Contact Form Submission Confirmation',
      text: `Dear ${fullName},\n\nThank you for contacting us. We have received your submission and will get back to you shortly.\n\nBest regards,\nvvGrad Team`,
    };

    // Send notification email to the admin
    const adminMailOptions = {
      from: 'marketing@vvgrad.com',
      to: 'vishnusharmabora93@gmail.com', // admin email address
      subject: 'New Contact Form Submission',
      text: `A new contact form submission has been received:\n\nFull Name: ${fullName}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
    };

    // Send emails (user and admin)
    await transporter.sendMail(userMailOptions);
    await transporter.sendMail(adminMailOptions);

    // Return success response
    res.status(201).json({
      message: 'Contact form submitted successfully. Confirmation email sent to user and enquiry email sent to admin.',
      Data: sudheer
    });
  } catch (err) {
    console.error('Error creating contact:', err);
    res.status(500).json({ error: err.message });
  }
};

// Get all contacts
const getAllContacts = async (req, res) => {
  try {
    // Fetch all contact records from the database
    const contacts = await Contact.find();

    // Check if any contacts exist
    if (contacts.length === 0) {
      return res.status(404).json({ message: 'No contacts found.' });
    }

    // Return the contacts as a response
    res.status(200).json({
      message: 'Contacts retrieved successfully.',
      data: contacts,
    });
  } catch (err) {
    console.error('Error fetching contacts:', err);
    res.status(500).json({ error: err.message});
  }
};

module.exports = { createContact, getAllContacts };