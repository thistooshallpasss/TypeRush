import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import statsReducer from '../features/stats/statsSlice';
import leaderboardReducer from '../features/leaderboard/leaderboardSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        stats: statsReducer,
        leaderboard: leaderboardReducer,
    },
});
