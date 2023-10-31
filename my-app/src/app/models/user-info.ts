import { AuthorizationInfo } from "./authorization-info";
import { UserRole } from "./user-role";

export type UserInfo = {
  auth: AuthorizationInfo,
  roles: UserRole[];
}
