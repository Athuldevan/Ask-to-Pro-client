import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import type { RootState } from "@/store";
import { setCredentials, logout } from "../slices/authSlice";
export const createBaseQueryWithReauth = (baseUrl: string) => {
  const rawBaseQuery = fetchBaseQuery({
    baseUrl,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  });

  return async (args, api, extraOptions) => {
    let result = await rawBaseQuery(args, api, extraOptions);

    if (result.error?.status === 401) {
      // refresh ALWAYS hits auth service
      const refreshResult = await rawBaseQuery(
        {
          url: `${import.meta.env.VITE_AUTH_SERVICE_URL}/refresh`,
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

        // retry original request
        result = await rawBaseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logout());
      }
    }

    return result;
  };
};
