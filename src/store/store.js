import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './authSlice';
import { catReducer } from './categorySlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: catReducer,
  },
})

