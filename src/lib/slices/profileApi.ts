import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../api/customBaseQuery";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Profile"],
  endpoints: (builder) => ({
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

export const { useEditProfileMutation } = userApi;
