import type { permissionActions, permissionModules } from "../constants/role";

export interface IRolePermission {
  name: string;
  module: IPermissionModule;
  actions: IPermissionAction[];
  createdAt?: Date;
}

export type IPermissionModule = (typeof permissionModules)[number];
export type IPermissionAction = (typeof permissionActions)[number];
