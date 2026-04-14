import {  z } from "zod";
import { gender, roles } from "../../constants/role";

// ============ Common Validations ============
const emailSchema = z.string().email("Invalid email address");

const passwordSchema = z
  .string()
  .min(2, "Password must be at least 8 characters");
// .regex(/[A-Z]/, "Must contain at least one uppercase letter")
// .regex(/[a-z]/, "Must contain at least one lowercase letter")
// .regex(/[0-9]/, "Must contain at least one number");

const phoneSchema = z
  .string()
  .regex(/^\d{10}$/, "Phone must be 10 digits")
  .optional()
  .or(z.literal(""));

export const studentRegistrationSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
    phone: phoneSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const mentorRegistrationSchema = z
  .object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
    phone: phoneSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const adminRegistrationSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
    phone: phoneSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const otpSchema = z.object({
  otp: z
    .string()
    .length(6, "OTP must be 6 digits")
    .regex(/^\d+$/, "OTP must contain only numbers"),
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
  role: z.enum(roles),
});

const credentialSchema = z.object({
  title: z.string(),
  documentUrl: z.string().url().optional(),
  isVerified: z.boolean(),
});
export const profileCompletionSchema = z.object({
  gender: z.enum(gender),
  dateOfBirth: z.string(),
  jobTitle: z.string(),
  company: z.string(),
  industry: z.string(),
  yearsOfExperience: z.number(),
  bio: z.string().optional(),
  expertise: z.string(),
  skills: z.string().array(),
  languages: z.string().array().optional(),
  credentials: z.array(credentialSchema),
});

export type StudentRegistrationForm = z.infer<typeof studentRegistrationSchema>;
export type MentorRegistrationForm = z.infer<typeof mentorRegistrationSchema>;
export type AdminRegistrationForm = z.infer<typeof adminRegistrationSchema>;
export type OtpForm = z.infer<typeof otpSchema>;
export type LoginForm = z.infer<typeof loginSchema>;
export type MentorCompleteProfileSchema = z.infer<
  typeof profileCompletionSchema
>;
