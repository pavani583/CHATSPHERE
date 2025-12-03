const express = require('express');
const router = express.Router();
const { requestOtp, verifyOtp, getUsers } = require('../controllers/authController');

router.post('/request-otp', requestOtp);
router.post('/verify-otp', verifyOtp);
router.get('/users', getUsers);

module.exports = router;