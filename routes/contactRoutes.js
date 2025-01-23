const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

router.post('/contact', contactController.createContact);
router.get('/getallcontacts', contactController.getAllContacts);


module.exports = router;