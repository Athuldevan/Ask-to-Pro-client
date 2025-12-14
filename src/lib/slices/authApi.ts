import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "@/store";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_AUTH_SERVICE_URL,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
     const store = getState() as RootState
      const token =  store.auth.acessToken;
      if(!token) console.log("Sorry Token is not found")
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
    }),

    logout : builder.mutation<void,void>({
     query :()=> ({
      url  :"/logout",
      method:'POST'
     })
    }),

    viewProfile: builder.query({
      query: () => ({
        url: "/me",
        method: "GET",
      }),
    }),
  }),
});

export const { useLoginMutation, useViewProfileQuery, useLogoutMutation } = authApi;
