import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  userId: string; // Add userId
  name: string;
  email: string;
  phone: string;
}

const initialState: User = {
  userId: 'user123', // Example user ID
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '123-456-7890',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
