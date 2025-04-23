const express = require('express');
const router = express.Router();

// Controllers
const refreshData = require('../controller/refreshData');
const getTotalRevenue = require('../controller/getTotalRevenue');

// Routes
router.post('/refresh', refreshData);
router.post('/revenue', getTotalRevenue);

module.exports = router;

