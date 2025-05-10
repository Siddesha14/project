const express = require('express');
const router = express.Router();
const { 
  getDonorProfile, 
  updateDonorProfile,
  getDonationHistory
} = require('../controllers/donorController');
const { protect } = require('../middlewares/auth');

router.route('/profile')
  .get(protect, getDonorProfile)
  .put(protect, updateDonorProfile);

router.get('/history', protect, getDonationHistory);

module.exports = router;