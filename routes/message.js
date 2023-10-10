const express = require('express');
const messageController = require('../controllers/message');
const userauthentication = require('../middleware/auth')
const router = express.Router();

// Add message=> POST
router.post('/add-message', userauthentication.authenticate, messageController.postMessage);

// Get messages => GET
router.get('/get-messages', messageController.getMessages);

module.exports = router;
