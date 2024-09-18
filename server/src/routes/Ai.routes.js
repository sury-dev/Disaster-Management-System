const express = require('express');
const { handleQuery } = require('../utils/chatBot.js');

const router = express.Router(); // Create a router instance

router.post('/askai', handleQuery); // Define the route and attach the controller

module.exports = router; // Export the router
