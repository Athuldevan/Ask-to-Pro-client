export const roles = ["student", "mentor", "admin"] as const;
export const gender = ["male", "female", "others", ""] as const;

export type Role = (typeof roles)[number];
export type Gender = (typeof gender)[number];

export const permissionModules = ["STUDENT_DASHBOARD"] as const;

export const permissionActions = [
  "create",
  "read",
  "update",
  "delete",
] as const;

export const globalRoles = ["super_admin", "regular_user"] as const;
