import { createApi } from "@reduxjs/toolkit/query/react";
import {  createBaseQueryWithReauth } from "../api/customBaseQuery";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: createBaseQueryWithReauth(
    import.meta.env.VITE_AUTH_SERVICE_URL
  ),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),

    viewProfile: builder.query({
      query: () => ({
        url: "/me",
        method: "GET",
      }),
    }),
  }),
});

export const { useLoginMutation, useViewProfileQuery, useLogoutMutation } =
  authApi;
