import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfoService } from './user-info.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private userInfoService: UserInfoService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let securityToken = this.userInfoService.getSecurityToken();
    let reqUpdate: any = {};

    if (securityToken != null && securityToken.length > 0) {
      reqUpdate.headers = new HttpHeaders().set("Authorization", "SecurityToken: " + securityToken);
    }

    let modifiedReq = req.clone(reqUpdate);

    return next.handle(modifiedReq);
  }
}
