
 export type VerificationStatus = "pending" | "verified" | "rejected";
export interface MentorData {
  skills?: string[];
  domains?: string[];
  experience?: number;
  education?: string;
  company?: string;
  jobTitle?: string;
  price?: number;
  currency?: string;
  githubUrl?: string;
  verificationStatus?: VerificationStatus;
}