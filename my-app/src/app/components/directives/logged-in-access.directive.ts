import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { LocalStorageKey } from '../../directories/local-storage-key';

@Directive({
  selector: '[acLoggedInAccess]'
})
export class LoggedInAccessDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) {
  }

  ngOnInit() {
    let securityToken: string = localStorage.getItem(LocalStorageKey.AcAppUserSecurityToken)!;
    let isUserLoggedIn: boolean = securityToken?.length > 0;

    if (isUserLoggedIn) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
