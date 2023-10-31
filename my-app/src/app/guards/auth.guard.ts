import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppContextService } from '../services/app-context.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private appContextService: AppContextService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.checkIsUserLoggedIn();
  }

  private checkIsUserLoggedIn() {
    if (this.appContextService.isUserLoggedIn.value) {
      return true;
    }

    return this.router.parseUrl('/login');
  }
}
