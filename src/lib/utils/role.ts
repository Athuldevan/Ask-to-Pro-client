import type { IPermissionAction, IPermissionModule } from "../../types/role";
import type { IUser } from "../../types/user";

export const hasAccess = (
  user: IUser | undefined | null,
  module: IPermissionModule,
  action?: IPermissionAction
): boolean => {
  if (!user) return false;

  // super admins bypass
  if (user.globalRole === "super_admin") return true;

  const permissions = user.userRole?.allPermissions || [];

  // check if module exists
  const modulePermission = permissions.find((p) => p.module === module);
  if (!modulePermission) return false;

  // if only module check (no specific action)
  if (!action) return true;

  // if action is also required
  return modulePermission.actions.includes(action);
};
