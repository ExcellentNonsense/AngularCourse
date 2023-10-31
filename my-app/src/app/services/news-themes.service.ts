import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsThemesService {
  private apiUrl: string = "https://localhost:5001/api/newsthemes";

  constructor(private http: HttpClient) { }

  public getThemes(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl);
  }
}
