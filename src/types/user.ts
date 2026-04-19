import type { IPermissionModule, IPermissionAction } from "./role";

export interface IUser {
  _id: string;
  email: string;
  role: string;
  globalRole?: string;
  userRole?: {
    allPermissions?: {
      module: IPermissionModule;
      actions: IPermissionAction[];
    }[];
  };
  [key: string]: any;
}
