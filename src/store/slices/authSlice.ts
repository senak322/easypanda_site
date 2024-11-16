import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AuthState } from "../../types/types";


const initialState: AuthState = {
  isAuthenticated: false,
  tokenChecked: false,
  token: ""
};

const baseURL =
  process.env.NODE_ENV === "development" ? "http://localhost:3001" : "";

export const checkTokenValidity = createAsyncThunk('auth/checkTokenValidity', async (_, thunkAPI) => {
  const token = localStorage.getItem('jwtToken');
  if (!token) {
    return thunkAPI.rejectWithValue('No token found');
  }

  try {
    const response = await fetch(`${baseURL}/api/auth/check-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Token is invalid');
    }

    return true;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { token } = action.payload;
      localStorage.setItem("jwtToken", token);
      // state.user = user;
      state.token = token;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(checkTokenValidity.fulfilled, state => {
        state.isAuthenticated = true;
        state.tokenChecked = true;
      })
      .addCase(checkTokenValidity.rejected, state => {
        state.isAuthenticated = false;
        state.tokenChecked = true;
      });
  },
});



export const { setCredentials } = authSlice.actions;
export default authSlice.reducer;


// setCredentials: (state, action) => {
//   const { token } = action.payload;
//   localStorage.setItem("jwtToken", token);
//   // state.user = user;
//   state.token = token;
// },