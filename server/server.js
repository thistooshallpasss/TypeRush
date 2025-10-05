const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load environment variables from .env file
dotenv.config();

// Initialize database connection
connectDB();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to enable Cross-Origin Resource Sharing (CORS)
// This allows your frontend (on a different port) to communicate with the backend
app.use(cors());

// --- API Routes ---
app.get('/', (req, res) => {
    res.send('Typing Test API is up and running!');
});

// Route for authentication-related endpoints
app.use('/api/auth', require('./routes/authRoutes'));
// Route for score-related endpoints
app.use('/api/scores', require('./routes/scoreRoutes'));
// Route for leaderboard endpoints
app.use('/api/leaderboard', require('./routes/leaderboardRoutes'));

const PORT = process.env.PORT || 5020;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
