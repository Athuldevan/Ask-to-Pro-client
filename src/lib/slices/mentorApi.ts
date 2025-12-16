import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQueryWithReauth } from "../api/customBaseQuery";

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
};

export type GetAllMentorsResponse = {
  status: string;
  mentors: Mentor[];
};

export type GetMentorByIdResponse = {
  status: string;
  mentor: Mentor;
};

export const mentorApi = createApi({
  reducerPath: "mentorApi",
  tagTypes: ["Mentor"],
  baseQuery: createBaseQueryWithReauth(import.meta.env.VITE_MENTOR_SERVICE_URL),
  endpoints: (builder) => ({
    getAllMentors: builder.query<GetAllMentorsResponse, void>({
      query: () => ({
        url: "/getAllMentors",
        method: "GET",
      }),
    }),
    getMentorById: builder.query<GetMentorByIdResponse, string>({
      query: (id) => ({
        url: `/getMentor/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllMentorsQuery, useGetMentorByIdQuery } = mentorApi;
