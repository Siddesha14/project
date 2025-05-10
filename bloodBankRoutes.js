const express = require('express');
const router = express.Router();
const bloodBankController = require('../controllers/bloodBankController');
const { protect, admin } = require('../middlewares/auth');

// @desc    Get blood bank inventory
// @route   GET /api/bloodbank/inventory
// @access  Private/Admin
router.get('/inventory', protect, admin, bloodBankController.getInventory);

// @desc    Update blood bank inventory
// @route   PUT /api/bloodbank/inventory
// @access  Private/Admin
router.put('/inventory', protect, admin, bloodBankController.updateInventory);

// @desc    Get blood bank statistics
// @route   GET /api/bloodbank/stats
// @access  Private/Admin
router.get('/stats', protect, admin, bloodBankController.getStatistics);

module.exports = router;