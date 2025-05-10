const express = require('express');
const router = express.Router();
const { 
  getHospitalProfile, 
  updateHospitalProfile,
  createRequest,
  getHospitalRequests,
  getHospitalHistory
} = require('../controllers/hospitalController');
const { protect } = require('../middlewares/auth');

router.route('/profile')
  .get(protect, getHospitalProfile)
  .put(protect, updateHospitalProfile);

router.route('/requests')
  .post(protect, createRequest)
  .get(protect, getHospitalRequests);

router.get('/history', protect, getHospitalHistory);

module.exports = router;