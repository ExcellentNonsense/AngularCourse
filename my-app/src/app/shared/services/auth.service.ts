import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthorizationInfo } from '../../models/authorization-info';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string = "https://localhost:5001/api/auth";

  constructor(private http: HttpClient) { }

  public logIn(authInfo: AuthorizationInfo): Observable<string> {
    return this.http.post<string>(this.apiUrl, authInfo, { responseType: 'text' as "json" });
  }
}
