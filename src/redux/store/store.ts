// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import slicesUnificados from '../slices/slicesUnificados';

const store = configureStore({
  reducer: slicesUnificados,
});

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
