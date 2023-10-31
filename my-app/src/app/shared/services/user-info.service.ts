import { Injectable } from '@angular/core';
import { LocalStorageKey } from '../../directories/local-storage-key';
import { RolePermissionType } from '../../enums/role-permission-type';
import { UserRoleType } from '../../enums/user-role-type';
import { AuthorizationInfo } from '../../models/authorization-info';
import { RolePermission } from '../../models/role-permission';
import { UserInfo } from '../../models/user-info';
import { UserRole } from '../../models/user-role';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  public getAuthorizationInfo(): AuthorizationInfo {
    return USERINFO.auth;
  }

  public getSecurityToken(): string {
    return localStorage.getItem(LocalStorageKey.AcAppUserSecurityToken) ?? "";
  }

  public getRoles(): UserRole[] {
    return USERINFO.roles;
  }
}

const CANEDIT: RolePermission = {
  type: RolePermissionType.CanEdit,
  value: true
};

const CANDELETE: RolePermission = {
  type: RolePermissionType.CanDelete,
  value: true
};

const NEWSEDITORROLE: UserRole = {
  type: UserRoleType.NewsEditor,
  permissions: [CANEDIT, CANDELETE]
};

const USERINFO: UserInfo = {
  auth: {
    login: "JohnPetrov",
    password: "******"
  },
  roles: [NEWSEDITORROLE]
};
