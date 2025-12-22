import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "@/lib/api/customBaseQuery";
import { type Mentor } from "@/lib/slices/mentorApi";

export type PendingMentorsResponse = {
  status: string;
  mentors: Mentor[];
};

export const adminApi = createApi({
  reducerPath: "adminApi",
  tagTypes: ["PendingMentors"],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getAllPendingMentors: builder.query<PendingMentorsResponse, void>({
      query: () => ({
        url: "/admin/mentors/pending",
        method: "GET",
      }),
      providesTags: ["PendingMentors"],
    }),
    approveMentor: builder.mutation<{ status: string }, string>({
      query: (id) => ({
        url: `/admin/mentors/${id}/approve`,
        method: "PATCH",
      }),
      invalidatesTags: ["PendingMentors"],
    }),
    rejectMentor: builder.mutation<{ status: string }, string>({
      query: (id) => ({
        url: `/admin/mentors/${id}/reject`,
        method: "PATCH",
      }),
      invalidatesTags: ["PendingMentors"],
    }),
  }),
});

export const {
  useGetAllPendingMentorsQuery,
  useApproveMentorMutation,
  useRejectMentorMutation,
} = adminApi;
