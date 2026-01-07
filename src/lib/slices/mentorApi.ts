import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../api/customBaseQuery";
import type { IMentor } from "@/constants/mentor";

export type Mentor = {
  _id: string;
  name?: string;
  jobTitle?: string;
  company?: string;
  category?: string;
  bio?: string;
  skills?: string[];
  experience?: number;
  avgRating?: number;
  totalSessions?: number;
  price?: number;
  image?: string;
  githubUrl?: string;
  userName: string;
  userEmail: string;
  userAvatar: string;
  education: string;
  verificationStatus: string;
};

export type GetAllMentorsResponse = {
  status: string;
  mentors: IMentor[];
};

export interface GetMentorResponse {
  status: string;
  mentor: IMentor;
}

export const mentorApi = createApi({
  reducerPath: "mentorApi",
  tagTypes: ["Mentor"],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getAllMentors: builder.query<GetAllMentorsResponse, void>({
      query: () => ({
        url: "/mentor/getAllMentors",
        method: "GET",
      }),
    }),
    getMentorById: builder.query<IMentor, string>({
      query: (id) => ({
        url: `/mentor/getMentor/${id}`,
        method: "GET",
      }),
    }),

      // Get Mentor Profile
      getMentorProfile: builder.query<GetMentorResponse, void>({
        query: () => ({
          url: "/mentor/profile",
          method: "GET",
        }),
      }),

    // Create Mentor Profile
    createMentorProfile: builder.mutation({
      query: (data) => ({
        url: "/mentor/createProfile",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllMentorsQuery,
  useGetMentorByIdQuery,
  useGetMentorProfileQuery,
  useLazyGetMentorProfileQuery,
  useCreateMentorProfileMutation,
} = mentorApi;
