import { Document } from "mongoose";
export interface IMentorSocialLinks {
  linkedin?: string;
  github?: string;
  twitter?: string;
  website?: string;
}

export interface ICredential {
  title: string; // "Google Cloud Certified", "Ex-Amazon SDE"
  documentUrl?: string; // uploaded proof
  isVerified: boolean;
}

export interface ITimeSlot {
  startTime: string; // "09:00"  (24hr format)
  endTime: string; // "09:45"
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

export type AccountStatus =
  | "inactive"
  | "pending_approval"
  | "active"
  | "rejected"
  | "blocked";

export type ApprovalStatus =
  | "pending"
  | "under_review"
  | "approved"
  | "rejected";

export interface IMentor extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  avatar?: string;
  gender?: "male" | "female" | "other";
  dateOfBirth?: Date;
  role: 'admin' | 'mentor' | 'student'

  jobTitle: string;
  company: string;
  industry: string;
  yearsOfExperience: number;
  bio: string;
  expertise: string[];
  skills: string[];
  languages: string[];
  credentials: ICredential[];

  sessionDuration: number;
  sessionPrice: number;
  currency: string;
  isFreeSessionAvailable: boolean;
  availability: IAvailability[];
  maxSessionsPerDay: number;

  socialLinks?: IMentorSocialLinks;
  registrationStep: 1 | 2 | 3 | 4; // 1 = signed up (email not verified)
  // 2 = email verified
  // 3 = professional details filled
  // 4 = mentorship setup done + application submitted
  // 5 = admin approved → LIVE
  approvalStatus: ApprovalStatus;
  rejectionReason?: string;
  isEmailVerified: boolean;
  isBlocked: boolean;
  blockedReason?: string;
  isFeatured: boolean;

  averageRating: number;
  totalReviews: number;
  totalSessionsCompleted: number;
  totalEarnings: number;
  walletBalance: number;
  refreshToken?: string;

  applicationSubmittedAt: Date;
  applicationSubmitted: boolean;

  reviewedAt: Date;
  accountStatus:
    | "inactive"
    | "pending_approval"
    | "active"
    | "rejected"
    | "blocked";

  createdAt: Date;
  updatedAt: Date;


}
