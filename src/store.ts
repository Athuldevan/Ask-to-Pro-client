// store.js
import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./lib/slices/authApi";
import authReducer from "./lib/slices/authSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});


// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;