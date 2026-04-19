import type { IMentor } from "../types/mentor";
import type { IPermissionAction, IPermissionModule } from "../types/role";

export const hasAccess = (
  user: IMentor | undefined,
  module: IPermissionModule,
  action?: IPermissionAction,
): boolean => {
  if (!user) return false;

  //   // super admins bypass
  //   if (user === "super_admin") return true;

    const permissions = user.role?.allPermissions || [];

  // check if module exists
  const modulePermission = permissions.find((p) => p.module === module);
  if (!modulePermission) return false;

  // if only module check (no specific action)
  if (!action) return true;

  // if action is also required
  return modulePermission.actions.includes(action);
};
