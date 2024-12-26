import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './slices/booksSlice';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    books: booksReducer,
    auth: authReducer,
    user: userReducer, // Add user slice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
