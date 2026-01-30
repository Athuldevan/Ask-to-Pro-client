import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../api/customBaseQuery";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Profile"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),

    register: builder.mutation({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
    }),

    verifyOtp: builder.mutation({
      query: (enteredOtp) => ({
        url: "/auth/verify",
        method: "POST",
        body: enteredOtp,
      }),
    }),

    viewProfile: builder.query({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),
    editProfile: builder.mutation({
      query: (data) => ({
        url: "/auth/profile/edit",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const {
  useLoginMutation,
  useViewProfileQuery,
  useLogoutMutation,
  useRegisterMutation,
  useVerifyOtpMutation,
  useEditProfileMutation,
} = authApi;
