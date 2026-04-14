// types/auth.types.ts

export type Role = "student" | "mentor" | "admin";
export type Gender = "male" | "female" | "other" | "others";

export type CareerStatus =
  | "school_student"
  | "college_student"
  | "employed"
  | "unemployed"
  | "freelancer"
  | "career_switch";

export interface IEducation {
  degree: string;
  institution: string;
  startYear: number;
  endYear?: number;
  isCurrent: boolean;
}

export interface ISocialLinks {
  linkedin?: string;
  github?: string;
  portfolio?: string;
}

export interface IWorkExperience {
  role: string;
  company: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  description?: string;
}

// Student registration data (step 1 - basic info)
export interface StudentRegistrationStep1 {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

// Full student registration
export interface StudentRegistrationData extends StudentRegistrationStep1 {
  avatar?: string;
  gender?: Gender;
  currentStatus?: CareerStatus;
  bio?: string;
  education?: IEducation;
  workExperience?: IWorkExperience;
  skills?: string[];
  interestedMentorshipAreas?: string[];
  social?: ISocialLinks;
}

// ============ Mentor Types ============
export interface IMentorSocialLinks {
  linkedin?: string;
  github?: string;
  twitter?: string;
  website?: string;
}

export interface ICredential {
  title: string;
  documentUrl?: string;
  isVerified?: boolean;
}

export interface ITimeSlot {
  startTime: string;
  endTime: string;
}

export interface IAvailability {
  day:
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"
    | "saturday"
    | "sunday";
  slots: ITimeSlot[];
  isActive: boolean;
}

// Mentor registration data (step 1 - basic info)
export interface MentorRegistrationStep1 {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
}

// Full mentor registration
export interface MentorRegistrationData extends MentorRegistrationStep1 {
  avatar?: string;
  gender?: Gender;
  dateOfBirth?: string;
  jobTitle?: string;
  company?: string;
  industry?: string;
  yearsOfExperience?: number;
  bio?: string;
  expertise?: string[];
  skills?: string[];
  languages?: string[];
  credentials?: ICredential[];
  sessionDuration?: number;
  sessionPrice?: number;
  currency?: string;
  isFreeSessionAvailable?: boolean;
  availability?: IAvailability[];
  maxSessionsPerDay?: number;
  socialLinks?: IMentorSocialLinks;
}

export type AdminRole = "super_admin" | "moderator" | "support";

export interface AdminRegistrationData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  avatar?: string;
  role?: AdminRole;
}

export type RegistrationData =
  | StudentRegistrationData
  | MentorRegistrationData
  | AdminRegistrationData;

export interface SendOtpRequest {
  role: Role;
  data: Partial<RegistrationData>;
}

export interface SendOtpResponse {
  status: "success" | "error";
  message: string;
  expiresIn?: number;
}

export interface VerifyOtpRequest {
  role: Role;
  email: string;
  otp: string;
}

export interface VerifyOtpResponse {
  status: "success" | "error";
  message: string;
  data?: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    user: any;
    accessToken: string;
    refreshToken: string;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
  role: Role;
}

export interface LoginResponse {
  status: "success" | "error";
  message: string;
  data?: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    user: any;
    accessToken: string;
    refreshToken: string;
  };
}

export interface StudentRegistrationForm extends StudentRegistrationStep1 {
  confirmPassword: string;
}

export interface MentorRegistrationForm extends MentorRegistrationStep1 {
  confirmPassword: string;
}

export interface AdminRegistrationForm extends AdminRegistrationData {
  confirmPassword: string;
}
