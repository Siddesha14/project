const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Donor = require('../models/Donor');
const Hospital = require('../models/Hospital');

// Helper function to generate JWT token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    let profile = null;
    if (user.role === 'donor') {
      profile = await Donor.findOne({ user: user._id });
    } else if (user.role === 'hospital') {
      profile = await Hospital.findOne({ user: user._id });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
      profile
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Register Donor
const registerDonor = async (req, res) => {
  const { name, email, password, age, bloodType, address } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: 'donor'
    });

    const donor = await Donor.create({
      user: user._id,
      age,
      bloodType,
      address
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
      profile: donor
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Register Hospital
const registerHospital = async (req, res) => {
  const { name, email, password, hospitalId, address, contact } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: 'hospital'
    });

    const hospital = await Hospital.create({
      user: user._id,
      hospitalId,
      address,
      contact
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
      profile: hospital
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get User Profile
const getUserProfile = async (req, res) => {
  try {
    let profile = null;
    
    if (req.user.role === 'donor') {
      profile = await Donor.findOne({ user: req.user._id });
    } else if (req.user.role === 'hospital') {
      profile = await Hospital.findOne({ user: req.user._id });
    }

    res.json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      profile
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  loginUser,
  registerDonor,
  registerHospital,
  getUserProfile
};