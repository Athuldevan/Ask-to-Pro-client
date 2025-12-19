import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import type { RootState } from "@/store";
import { setCredentials, logout } from "../slices/authSlice";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL, // ONLY GATEWAY
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    const refreshResult = await rawBaseQuery(
      {
        url: "/auth/refresh", 
        method: "POST",
      },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      api.dispatch(
        setCredentials({
          accessToken: (refreshResult.data as any).accessToken,
          user: (api.getState() as RootState).auth.user,
        })
      );

      result = await rawBaseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};
