import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQueryWithReauth } from "../api/customBaseQuery";

export const mentorApi = createApi({
  reducerPath: "mentorApi",
  tagTypes: ["Mentor"],
  baseQuery: createBaseQueryWithReauth(import.meta.env.VITE_MENTOR_SERVICE_URL),

  endpoints: (builder) => ({
    getAllMentors: builder.query<void, void>({
      query: () => ({
        url: "/getAllMentors",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllMentorsQuery } = mentorApi;
