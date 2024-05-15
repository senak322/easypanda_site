import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const verifyToken = createAsyncThunk(
    'auth/verifyToken',
    async (_, { getState }) => {
        const token = getState().auth.token;
        const response = await axios.get('/api/verifyToken', {
          headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
      }
)

const authSlice = createSlice({
    name: 'auth',
    initialState: {
      user: null,
      token: localStorage.getItem('jwtToken') || null,
      status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
      error: null
    },
    reducers: {
      logout: (state) => {
        localStorage.removeItem('jwtToken');
        state.user = null;
        state.token = null;
      },
      setCredentials: (state, action) => {
        const { user, token } = action.payload;
        localStorage.setItem('jwtToken', token);
        state.user = user;
        state.token = token;
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(verifyToken.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(verifyToken.fulfilled, (state, action) => {
          state.user = action.payload.user;
          state.status = 'succeeded';
        })
        .addCase(verifyToken.rejected, (state, action) => {
          localStorage.removeItem('jwtToken');
          state.status = 'failed';
          state.error = action.error.message;
          state.user = null;
          state.token = null;
        });
    }
  });
  
  export const { logout, setCredentials } = authSlice.actions;
  export default authSlice.reducer;