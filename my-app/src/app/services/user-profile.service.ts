import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserProfile } from '../models/user-profile';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private apiUrl: string = "https://localhost:5001/api/userprofile";

  constructor(private http: HttpClient) { }

  public getUserProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(this.apiUrl);
  }

  public updateUserProfile(userProfile: UserProfile) {
    this.http.put(this.apiUrl, userProfile).subscribe(
      { error: (error: HttpErrorResponse) => console.log(error.status + ' ' + error.message) }
    );
  }
}
