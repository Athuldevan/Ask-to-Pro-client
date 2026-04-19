import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Role } from "../../constants/role";
import type {
  SendOtpRequest,
  VerifyOtpRequest,
  VerifyOtpResponse,
} from "../../types/student";

interface LoginResponse {
  status: string;
  message: string;
}

interface LoginRequest {
  email: string;
  password: string;
  role: Role;
}

interface SendOtpResponse {
  status: string;
  message: string;
}

export const authApi = createApi({
  reducerPath: "api/authAPi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials: LoginRequest) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    sendOtp: builder.mutation<SendOtpResponse, SendOtpRequest>({
      query: ({ role, data }) => ({
        url: `/auth/register/${role}/send-otp`,
        method: "POST",
        body: data,
      }),
    }),

    verifyOtp: builder.mutation<VerifyOtpResponse, VerifyOtpRequest>({
      query: ({ role, email, otp }) => ({
        url: `/auth/register/${role}/verify-otp`,
        method: "POST",
        body: { email, otp },
      }),
    }),
  }),
});

export const { useLoginMutation, useSendOtpMutation, useVerifyOtpMutation } =
  authApi;
