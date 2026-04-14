export const roles = ["student", "mentor", "admin"] as const;
export const gender = ["male", "female", "others", ""] as const;

export type Role = (typeof roles)[number];
export type Gender = (typeof gender)[number];
