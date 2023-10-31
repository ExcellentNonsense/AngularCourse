import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core';
import { UserRoleType } from '../../enums/user-role-type';
import { UserRole } from '../../models/user-role';
import { UserInfoService } from '../../shared/services/user-info.service';

@Directive({
  selector: '[acOperationAccess]'
})
export class OperationAccessDirective {
  private userRoles: UserRole[] = [];

  @Input() set acOperationAccess(operation: string) {
    switch (operation) {
      case "saveNewsChanges":
        if (this.userRoles.some(x => x.type === UserRoleType.NewsEditor)) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        }
        break;
      case "deleteNews":
        if (this.userRoles.some(x => x.type === UserRoleType.NewsEditor)) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        }
        break;
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private userInfoService: UserInfoService
  ) {
    this.userRoles = this.userInfoService.getRoles();
  }
}
