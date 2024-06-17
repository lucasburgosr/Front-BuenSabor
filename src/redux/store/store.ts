// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import slicesUnificados from '../slices/slicesUnificados';
import authSlice from '../slices/authSlice';
import rootReducer from '../slices/slicesUnificados';

const store = configureStore({
  reducer: {
    ...rootReducer,
    auth: authSlice
  }
});

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
