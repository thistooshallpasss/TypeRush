import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';

const initialState = {
    scores: [],
    isLoading: false,
    isError: false,
    message: '',
};

// Save a new score
export const saveScore = createAsyncThunk('stats/saveScore', async (scoreData, thunkAPI) => {
    try {
        return await api.post('/scores', scoreData);
    } catch (error) {
        const message = (error.response?.data?.message) || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

// Get user scores
export const getUserScores = createAsyncThunk('stats/getUserScores', async (_, thunkAPI) => {
    try {
        const response = await api.get('/scores');
        return response.data;
    } catch (error) {
        const message = (error.response?.data?.message) || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});


export const statsSlice = createSlice({
    name: 'stats',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(saveScore.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(saveScore.fulfilled, (state, action) => {
                state.isLoading = false;
                // Optionally add the new score to the top of the list
                state.scores.unshift(action.payload);
            })
            .addCase(saveScore.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getUserScores.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserScores.fulfilled, (state, action) => {
                state.isLoading = false;
                state.scores = action.payload;
            })
            .addCase(getUserScores.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = statsSlice.actions;
export default statsSlice.reducer;