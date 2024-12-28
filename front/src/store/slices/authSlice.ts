import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface User {
  userId: string;
  name: string;
  email: string;
  phone: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

const initialState: AuthState = {
  isAuthenticated: false, // Default: User is not authenticated
  user: null,
};

// Async thunk to fetch user profile
export const fetchUserProfile = createAsyncThunk(
  'auth/fetchUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3000/profile', {
        method: 'GET',
        credentials: 'include', // Include cookies in the request
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }

      return await response.json(); // Return user details
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return rejectWithValue('Unable to fetch user profile');
    }
  }
);

// Async thunk to handle logout
export const handleLogout = createAsyncThunk(
  'auth/handleLogout',
  async (_, { dispatch }) => {
    try {
      const response = await fetch('http://localhost:3000/logout', {
        method: 'POST',
        credentials: 'include', // Include cookies in the request
      });

      if (!response.ok) {
        throw new Error('Failed to logout from the server');
      }

      // Dispatch the logout action to clear the Redux state
      dispatch(authSlice.actions.logout());
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }
);

// Async thunk to update user details
export const updateUserDetails = createAsyncThunk(
  'auth/updateUserDetails',
  async (updatedDetails: Partial<User>, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3000/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Include cookies in the request
        body: JSON.stringify(updatedDetails),
      });

      if (!response.ok) {
        throw new Error('Failed to update user details');
      }

      return await response.json(); // Return the updated user details
    } catch (error) {
      console.error('Error updating user details:', error);
      return rejectWithValue('Unable to update user details');
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    updateUser: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state) => {
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(updateUserDetails.fulfilled, (state, action) => {
        if (state.user) {
          state.user = { ...state.user, ...action.payload }; // Update user details in state
        }
      });
  },
});

export const { login, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
