const express = require('express');
const router = express.Router();
const { saveScore, getUserScores } = require('../controllers/scoreController');
const { protect } = require('../middleware/authMiddleware');

// @route   POST api/scores
// @desc    Save a new score for the logged-in user
// @access  Private
router.post('/', protect, saveScore);

// @route   GET api/scores
// @desc    Get all scores for the logged-in user (for dashboard)
// @access  Private
router.get('/', protect, getUserScores);

module.exports = router;
