const Score = require('../models/Score');

// @desc    Save a new score after a test
const saveScore = async (req, res) => {
    const { wpm, accuracy, mode } = req.body;

    if (wpm === undefined || accuracy === undefined || !mode) {
        return res.status(400).json({ message: 'Please provide wpm, accuracy, and mode' });
    }

    try {
        const newScore = new Score({
            user: req.user.id, // from protect middleware
            wpm,
            accuracy,
            mode,
        });

        const savedScore = await newScore.save();
        res.status(201).json(savedScore);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get all scores for the logged-in user
const getUserScores = async (req, res) => {
    try {
        // find scores for the user and sort by newest first
        const scores = await Score.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(scores);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { saveScore, getUserScores };
