export enum VerificationStatus {
  Pending = "pending",
  Approved = "approved",
  Rejected = "rejected",
}
export interface IMentor {
  userName: string;
  userEmail: string;
  usetAvatar: string;
  skills: string[];
  isVerified: boolean;
  verificationStatus: VerificationStatus;
  githubUrl: string;
  jobTitle: string;
  price: number;
  experience: number;
  education: string;
  domains: string[];
  currency: string;
  category: string;
  company: string;
  bio: string;
}
