import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';

const initialState = {
    leaderboard: [],
    isLoading: false,
    isError: false,
    message: '',
};

// Get leaderboard data
export const getLeaderboard = createAsyncThunk('leaderboard/get', async (mode, thunkAPI) => {
    try {
        const response = await api.get(`/leaderboard?mode=${mode}`);
        return response.data;
    } catch (error) {
        const message = (error.response?.data?.message) || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

export const leaderboardSlice = createSlice({
    name: 'leaderboard',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getLeaderboard.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getLeaderboard.fulfilled, (state, action) => {
                state.isLoading = false;
                state.leaderboard = action.payload;
            })
            .addCase(getLeaderboard.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = leaderboardSlice.actions;
export default leaderboardSlice.reducer;