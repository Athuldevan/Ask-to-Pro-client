export interface WithId {
  _id: string;
}
export type IdName = WithId & { name: string };

export type Role = "student" | "mentor" | "admin";
