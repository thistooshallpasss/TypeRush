const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { check } = require('express-validator');

// @route   POST api/auth/register
// @desc    Register a new user
// @access  Public
router.post(
    '/register',
    [
        // Input validation using express-validator
        check('username', 'Username is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
    ],
    registerUser
);

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post(
    '/login',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists(),
    ],
    loginUser
);

// @route   GET api/auth/me
// @desc    Get logged-in user's profile
// @access  Private (protected route)
router.get('/me', protect, getUserProfile);


module.exports = router;
