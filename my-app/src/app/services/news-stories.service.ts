import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { News } from '../models/news';
import { BehaviorSubject, Observable } from 'rxjs';
import { newsStoriesFilter } from '../models/news-stories-filter';

@Injectable({
  providedIn: 'root'
})
export class NewsStoriesService {
  private apiUrl: string = "https://localhost:5001/api/newsstories";

  private newsStories!: BehaviorSubject<News[]>;

  constructor(private http: HttpClient) { }

  public addNews(news: News) {
    if (this.newsStories) {
      this.http.post<News>(this.apiUrl, news).subscribe(
        news => {
          let newsStories = this.newsStories.value;
          newsStories.push(news);
          this.newsStories.next(newsStories);
        },
        (error: HttpErrorResponse) => console.log(error.status + ' ' + error.message)
      );
    }
  }

  public updateNews(news: News) {
    this.http.put(this.apiUrl, news);
  }

  public deleteNews(id: number) {
    if (this.newsStories) {
      this.http.delete(this.apiUrl + "/" + id).subscribe(
        () => {
          let newsStories = this.newsStories.value;
          newsStories.splice(newsStories.findIndex(x => x.id === id), 1);
          this.newsStories.next(newsStories);
        },
        (error: HttpErrorResponse) => console.log(error.status + ' ' + error.message)
      );
    }
  }

  public getNewsStories(): Observable<News[]> {
    return this.http.get<News[]>(this.apiUrl + "/GetNewsStories");
  }

  public getNewsStoriesByFilter(filter: newsStoriesFilter): Observable<News[]> {
    this.newsStories = new BehaviorSubject<News[]>([]);
    this.http.post<News[]>(this.apiUrl + "/GetNewsStoriesByFilter", filter).subscribe(
      newsStories => this.newsStories.next(newsStories),
      (error: HttpErrorResponse) => console.log(error.status + ' ' + error.message)
    );

    return this.newsStories.asObservable();
  }

  public getNewsStoryById(id: number): Observable<News> {
    return this.http.get<News>(this.apiUrl + "/GetNewsStoryById/" + id);
  }
}
