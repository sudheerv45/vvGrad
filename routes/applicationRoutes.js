const express = require('express');
const router = express.Router();
const ApplicationController = require('../controllers/applicationController');
 
router.post('/application/create', ApplicationController.createApplication);
router.put('/application/update/:id', ApplicationController.updateApplicationById);
router.get('/application/get/:id', ApplicationController.getApplicationById);
router.get('/application/getall', ApplicationController.getApplications);
router.delete('/application/delete/:id', ApplicationController.deleteApplicationById);
router.patch('/application/restore/:id', ApplicationController.restoreApplicationById);
 
module.exports = router;