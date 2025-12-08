// store.js
import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './lib/slices/authSlice';


export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
