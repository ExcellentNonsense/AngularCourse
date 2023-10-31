import { RolePermissionType } from "../enums/role-permission-type";

export type RolePermission = {
  type: RolePermissionType;
  value: boolean;
}
