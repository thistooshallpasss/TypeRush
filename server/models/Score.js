const mongoose = require('mongoose');

const ScoreSchema = new mongoose.Schema({
    // Link to the user who achieved this score
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    wpm: {
        type: Number,
        required: true,
    },
    accuracy: {
        type: Number,
        required: true,
    },
    // The mode of the test, e.g., 'time-60', 'words-25'
    mode: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Score', ScoreSchema);
