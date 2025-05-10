const asyncHandler = require('express-async-handler');
const BloodBank = require('../models/BloodBank');
const Transaction = require('../models/Transaction');

// @desc    Get blood bank inventory
// @route   GET /api/bloodbank/inventory
// @access  Private/Admin
const getInventory = async (req, res) => {
  try {
    const inventory = await BloodBank.find();
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update blood bank inventory
// @route   PUT /api/bloodbank/inventory
// @access  Private/Admin
const updateInventory = asyncHandler(async (req, res) => {
  const { bloodType, quantity, operation } = req.body;
  
  const bloodBank = await BloodBank.findOne();
  
  if (!bloodBank) {
    res.status(404);
    throw new Error('Blood bank not found');
  }

  // Find the blood type in inventory
  const bloodTypeIndex = bloodBank.inventory.findIndex(item => item.bloodType === bloodType);
  
  if (bloodTypeIndex === -1) {
    // If blood type doesn't exist, add it
    bloodBank.inventory.push({
      bloodType,
      quantity: operation === 'add' ? quantity : -quantity,
      lastUpdated: Date.now()
    });
  } else {
    // Update existing blood type quantity
    if (operation === 'add') {
      bloodBank.inventory[bloodTypeIndex].quantity += quantity;
    } else {
      bloodBank.inventory[bloodTypeIndex].quantity -= quantity;
    }
    bloodBank.inventory[bloodTypeIndex].lastUpdated = Date.now();
  }

  await bloodBank.save();
  
  res.json(bloodBank.inventory);
});

// @desc    Get blood bank statistics
// @route   GET /api/bloodbank/stats
// @access  Private/Admin
const getStatistics = asyncHandler(async (req, res) => {
  try {
    // Get total blood units
    const bloodBank = await BloodBank.findOne();
    const totalUnits = bloodBank.inventory.reduce((sum, item) => sum + item.quantity, 0);

    // Get recent transactions (last 7 days)
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    const transactions = await Transaction.find({
      createdAt: { $gte: weekAgo }
    }).sort({ createdAt: -1 }).limit(5);

    res.json({
      totalUnits,
      bloodTypes: bloodBank.inventory,
      recentTransactions: transactions
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = {
  getInventory,
  updateInventory,
  getStatistics
};