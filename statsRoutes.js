const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middlewares/auth');
const { getStatistics, getInventoryStats } = require('../controllers/statsController');

// @desc    Get all statistics
// @route   GET /api/stats
// @access  Private/Admin
router.get('/', protect, admin, getStatistics);

// @desc    Get inventory statistics
// @route   GET /api/stats/inventory
// @access  Private/Admin
router.get('/inventory', protect, admin, getInventoryStats);

module.exports = router;