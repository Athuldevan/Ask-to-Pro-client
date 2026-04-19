import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const profileAPi = createApi({
  reducerPath: "/api/profile",
  baseQuery: fetchBaseQuery({ 
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    credentials: "include"
  }),
  endpoints: (builder) => ({
    completeStudentProfile: builder.mutation({
      query: (data) => ({
        url: "/student/complete",
        method: "POST",
        body: data,
      }),
    }),
    completeMentorProfile: builder.mutation({
      query: (data) => ({
        url: "/mentor/complete",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useCompleteStudentProfileMutation,
  useCompleteMentorProfileMutation,
} = profileAPi;
