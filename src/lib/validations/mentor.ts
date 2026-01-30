// lib/schemas/mentor.ts
import z from "zod";

export const mentorProfileSchema = z.object({
  // Basic Info
  userName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),

  userEmail: z.string().email("Invalid email address"),

  userAvatar: z.string().optional(),

  bio: z
    .string()
    .min(10, "Bio must be at least 10 characters")
    .max(500, "Bio must be less than 500 characters"),

  // Professional Info
  jobTitle: z
    .string()
    .min(2, "Job title must be at least 2 characters")
    .max(100, "Job title must be less than 100 characters"),

  company: z
    .string()
    .max(100, "Company name must be less than 100 characters")
    .optional()
    .or(z.literal("")),

  experience: z.coerce
    .number()
    .min(0, "Experience cannot be negative")
    .max(50, "Experience cannot exceed 50 years"),

  education: z
    .string()
    .max(200, "Education must be less than 200 characters")
    .optional()
    .or(z.literal("")),

  // Category & Skills
  category: z.string().min(1, "Please select a category"),

  domains: z
    .array(z.string())
    .min(1, "Select at least one domain")
    .max(5, "Maximum 5 domains allowed"),

  skills: z.array(z.string()).max(10, "Maximum 10 skills allowed").optional(),

  // Pricing
  price: z.coerce
    .number()
    .min(1, "Price must be at least 1")
    .max(10000, "Price cannot exceed 10000"),

  currency: z.string().min(1, "Please select a currency"),

  // Social Links
  githubUrl: z.string().url("Invalid GitHub URL").optional().or(z.literal("")),

  // Verification (read-only, but included in schema)
  isVerified: z.boolean().optional(),
});

export type MentorProfileFormData = z.infer<typeof mentorProfileSchema>;
