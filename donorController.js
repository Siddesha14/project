const asyncHandler = require('express-async-handler');
const Donor = require('../models/Donor');
const Transaction = require('../models/Transaction');

// @desc    Get donor profile
// @route   GET /api/donor/profile
// @access  Private/Donor
const getDonorProfile = asyncHandler(async (req, res) => {
  const donor = await Donor.findOne({ user: req.user._id }).populate('donationHistory');
  
  if (!donor) {
    res.status(404);
    throw new Error('Donor not found');
  }

  res.json(donor);
});

// @desc    Update donor profile
// @route   PUT /api/donor/profile
// @access  Private/Donor
const updateDonorProfile = asyncHandler(async (req, res) => {
  const donor = await Donor.findOne({ user: req.user._id });
  
  if (!donor) {
    res.status(404);
    throw new Error('Donor not found');
  }

  const { age, sex, address, bloodType } = req.body;

  donor.age = age || donor.age;
  donor.sex = sex || donor.sex;
  donor.address = address || donor.address;
  donor.bloodType = bloodType || donor.bloodType;

  const updatedDonor = await donor.save();

  res.json(updatedDonor);
});

// @desc    Get donor donation history
// @route   GET /api/donor/history
// @access  Private/Donor
const getDonationHistory = asyncHandler(async (req, res) => {
  const transactions = await Transaction.find({ donor: req.user._id, type: 'donation' })
    .sort({ date: -1 });
  
  res.json(transactions);
});

module.exports = {
  getDonorProfile,
  updateDonorProfile,
  getDonationHistory
};