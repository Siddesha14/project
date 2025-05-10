// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/auth');

// POST /api/auth/login
router.post('/login', authController.loginUser);

// GET /api/auth/me
router.get('/me', authMiddleware.protect, authController.getUserProfile);

// POST /api/auth/register/donor
router.post('/register/donor', authController.registerDonor);

// POST /api/auth/register/hospital
router.post('/register/hospital', authController.registerHospital);

module.exports = router;