const asyncHandler = require('express-async-handler');
const Hospital = require('../models/Hospital');
const Request = require('../models/Request');
const Transaction = require('../models/Transaction');

// @desc    Get hospital profile
// @route   GET /api/hospital/profile
// @access  Private/Hospital
const getHospitalProfile = asyncHandler(async (req, res) => {
  const hospital = await Hospital.findOne({ user: req.user._id });
  
  if (!hospital) {
    res.status(404);
    throw new Error('Hospital not found');
  }

  res.json(hospital);
});

// @desc    Update hospital profile
// @route   PUT /api/hospital/profile
// @access  Private/Hospital
const updateHospitalProfile = asyncHandler(async (req, res) => {
  const hospital = await Hospital.findOne({ user: req.user._id });
  
  if (!hospital) {
    res.status(404);
    throw new Error('Hospital not found');
  }

  const { hospitalId, address, location, contact } = req.body;

  hospital.hospitalId = hospitalId || hospital.hospitalId;
  hospital.address = address || hospital.address;
  hospital.location = location || hospital.location;
  hospital.contact = contact || hospital.contact;

  const updatedHospital = await hospital.save();

  res.json(updatedHospital);
});

// @desc    Create blood request
// @route   POST /api/hospital/requests
// @access  Private/Hospital
const createRequest = asyncHandler(async (req, res) => {
  const { bloodType, quantity, urgency } = req.body;
  
  const hospital = await Hospital.findOne({ user: req.user._id });
  
  if (!hospital) {
    res.status(404);
    throw new Error('Hospital not found');
  }

  const request = await Request.create({
    hospital: hospital._id,
    bloodType,
    quantity,
    urgency
  });

  res.status(201).json(request);
});

// @desc    Get hospital requests
// @route   GET /api/hospital/requests
// @access  Private/Hospital
const getHospitalRequests = asyncHandler(async (req, res) => {
  const hospital = await Hospital.findOne({ user: req.user._id });
  
  if (!hospital) {
    res.status(404);
    throw new Error('Hospital not found');
  }

  const requests = await Request.find({ hospital: hospital._id })
    .sort({ createdAt: -1 });

  res.json(requests);
});

// @desc    Get hospital transaction history
// @route   GET /api/hospital/history
// @access  Private/Hospital
const getHospitalHistory = asyncHandler(async (req, res) => {
  const transactions = await Transaction.find({ 
    hospital: req.user._id, 
    type: 'distribution' 
  }).sort({ date: -1 });
  
  res.json(transactions);
});

module.exports = {
  getHospitalProfile,
  updateHospitalProfile,
  createRequest,
  getHospitalRequests,
  getHospitalHistory
};