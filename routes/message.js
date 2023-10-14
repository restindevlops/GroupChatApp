const express = require('express');
const messageController = require('../controllers/message');
const userauthentication = require('../middleware/auth')
const router = express.Router();

// Add message=> POST
router.post('/add-message', userauthentication.authenticate, messageController.postMessage);

// Get messages => GET
router.get('/get-messages', messageController.getMessages);

// Get Personnal Messages => GET
router.get('/get-personal-messages', userauthentication.authenticate,messageController.getPersonalMessages);

// Get Group Messages => GET
router.get('/get-group-messages', userauthentication.authenticate,messageController.getGroupMessages);


module.exports = router;
