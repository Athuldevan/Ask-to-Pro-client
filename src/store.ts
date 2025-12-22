// store.js
import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./lib/slices/authApi";
import authReducer from "./lib/slices/authSlice";
import { mentorApi } from "./lib/slices/mentorApi";
import { adminApi } from "./features/admin/services/adminApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [mentorApi.reducerPath]: mentorApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(mentorApi.middleware)
      .concat(adminApi.middleware)
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
