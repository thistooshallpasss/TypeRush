const express = require('express');
const router = express.Router();
const { getLeaderboard } = require('../controllers/leaderboardController');

// @route   GET api/leaderboard?mode=time-60
// @desc    Get top scores for a specific mode
// @access  Public
router.get('/', getLeaderboard);

module.exports = router;
