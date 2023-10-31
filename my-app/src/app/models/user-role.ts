import { UserRoleType } from "../enums/user-role-type";
import { RolePermission } from "./role-permission";

export type UserRole = {
  type: UserRoleType;
  permissions: RolePermission[];
}
