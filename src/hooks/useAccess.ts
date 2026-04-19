import { useSelector } from "react-redux";
import { userApi } from "../lib/slices/userApi";
import { hasAccess } from "../lib/utils/role";
import type { IPermissionAction, IPermissionModule } from "../types/role";

export function useAccess() {
  const { data: userResponse } = useSelector(userApi.endpoints.getOneUser.select(null));
  
  // Depending on how getOneUser is structured, the actual user might be inside data.user or data directly
  const user = userResponse?.user || userResponse;

  return {
    can: (module: IPermissionModule, action?: IPermissionAction) =>
      hasAccess(user, module, action),
  };
}
