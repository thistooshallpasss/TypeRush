const Score = require('../models/Score');

// @desc    Get top 30 scores for a specific mode
const getLeaderboard = async (req, res) => {
    // Get mode from query string, e.g., /api/leaderboard?mode=time-60
    const { mode } = req.query;

    if (!mode) {
        return res.status(400).json({ message: 'Mode parameter is required' });
    }

    try {
        // This logic ensures we only get the single best score for each user.
        // 1. Sort all scores for the given mode by WPM in descending order.
        const allScores = await Score.find({ mode })
            .sort({ wpm: -1 })
            .populate('user', 'username'); // Join with User model to get username

        // 2. Use a Map to ensure each user appears only once with their highest score.
        const highestScores = new Map();
        for (const score of allScores) {
            const userId = score.user._id.toString();
            // Since the list is sorted, the first time we see a user,
            // it's their highest score.
            if (!highestScores.has(userId)) {
                highestScores.set(userId, score);
            }
        }

        // 3. Convert the Map values to an array and get the top 30.
        const leaderboard = Array.from(highestScores.values()).slice(0, 30);

        res.json(leaderboard);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getLeaderboard };
