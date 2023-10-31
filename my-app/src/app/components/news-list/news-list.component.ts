import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, ViewChild, QueryList, ViewChildren, OnInit, ChangeDetectorRef, OnDestroy, ElementRef } from '@angular/core';
import { BehaviorSubject, debounceTime, distinctUntilChanged, fromEvent, map, Observable, skip, Subject, switchMap, takeUntil } from 'rxjs';
import { News } from '../../models/news';
import { ContextMenuComponent } from '../../shared/components/context-menu/context-menu.component';
import { NewsStoriesService } from '../../services/news-stories.service';
import { NewsThemesService } from '../../services/news-themes.service';
import { NewsComponent } from './news/news.component';
import { ActivatedRoute, Router } from '@angular/router';
import { newsStoriesFilter } from '../../models/news-stories-filter';
import { select, Store } from '@ngrx/store';
import * as fromStore from '../../store';

@Component({
  selector: 'ac-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsListComponent implements OnInit, OnDestroy {
  public newsStories$!: Observable<News[] | undefined>;
  public newsStoriesCount$!: Observable<number | undefined>;
  public newsStoriesPolicyCount$!: Observable<number | undefined>;
  public newsStoriesTourismCount$!: Observable<number | undefined>;
  public newsStoriesEconomyCount$!: Observable<number | undefined>;
  public newsThemes: string[] = [];
  public selectedNewsIds: number[] = [];
  public allNewsThemes: string = "Все категории";
  public newsStoriesFilter: BehaviorSubject<newsStoriesFilter>;

  public get deleteSelectedNewsDisabled() { return this.selectedNewsIds.length === 0; }

  private destroy$ = new Subject();

  @ViewChildren(NewsComponent) private newsStoriesViews!: QueryList<NewsComponent>;

  @ViewChild(ContextMenuComponent) private contextMenu!: ContextMenuComponent;
  @ViewChild('searchField') private searchField!: ElementRef;

  constructor(
    private newsStoriesService: NewsStoriesService,
    private store: Store<fromStore.State>,
    private newsThemesService: NewsThemesService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.newsThemesService.getThemes().pipe(takeUntil(this.destroy$)).subscribe(
      themes => this.newsThemes = themes,
      (error: HttpErrorResponse) => console.log(error.status + ' ' + error.message)
    );

    this.newsStoriesFilter = new BehaviorSubject<newsStoriesFilter>({
      headline: this.route.snapshot.paramMap.get('headline') ?? "",
      theme: this.route.snapshot.paramMap.get('theme') ?? ""
    });
  }

  ngOnInit() {
    //this.route.paramMap.pipe(
    //  switchMap(params => this.newsStoriesService.getNewsStoriesByFilter({ headline: params.get('headline')!, theme: params.get('theme')! }))
    //)
    //.subscribe(
    //  newsStories => {
    //    this.newsStories = newsStories;
    //    this.cdr.detectChanges();
    //  },
    //  (error: HttpErrorResponse) => console.log(error.status + ' ' + error.message)
    //);

    //this.route.paramMap.pipe(
    //  switchMap(params => this.newsStoriesService.getNewsStoriesByFilter({ headline: params.get('headline')!, theme: params.get('theme')! }))
    //)
    //.subscribe(results => this.store.dispatch(new fromStore.LoadNewsSuccess(results)));

    this.store.dispatch(fromStore.loadNews());

    this.newsStories$ = this.store.pipe(select(fromStore.selectNews));
    this.newsStoriesCount$ = this.store.pipe(select(fromStore.selectNewsCount));
    this.newsStoriesPolicyCount$ = this.store.pipe(select(fromStore.selectPolicyNewsCount));
    this.newsStoriesTourismCount$ = this.store.pipe(select(fromStore.selectTourismNewsCount));
    this.newsStoriesEconomyCount$ = this.store.pipe(select(fromStore.selectEconomyNewsCount));

    fromEvent(this.searchField.nativeElement as any, 'input').pipe(
      debounceTime(600),
      map((x: any) => x.target.value),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    )
    .subscribe(x => {
      let filter = { ...this.newsStoriesFilter.value };
      filter.headline = x;
      this.newsStoriesFilter.next(filter)
    });

    this.newsStoriesFilter.pipe(
      skip(1),
      takeUntil(this.destroy$)
    )
      .subscribe(x => {
        let url: string = "/news";

        if (x.headline) {
          url += ";headline=" + x.headline;
        }

        if (x.theme) {
          url += ";theme=" + x.theme;
        }

        this.router.navigateByUrl(url)
      });
  }

  public createNews() {
    this.router.navigate([{ outlets: { newsEditor: ["add-news"]}}]);
  }

  public editNews(newsId: number) {
    this.router.navigate([{ outlets: { newsEditor: ["edit-news", newsId] } }]);
  }

  public deleteNews(newsId: number) {
    this.newsStoriesService.deleteNews(newsId);

    this.selectedNewsIds.splice(this.selectedNewsIds.findIndex(x => x === newsId), 1);
  }

  public deleteSelectedNewsStories() {
    this.selectedNewsIds.forEach(x => this.newsStoriesService.deleteNews(x));

    this.selectedNewsIds = [];
  }

  public selectNews(newsId: number, isSelected: boolean) {
    if (isSelected) {
      this.selectedNewsIds.push(newsId);
    }
    else {
      this.selectedNewsIds.splice(this.selectedNewsIds.findIndex(x => x === newsId), 1);
    }
  }

  public selectAllNewsStories() {
    this.newsStoriesViews.forEach(x => { x.isNewsSelected = true; x.cdr.detectChanges(); });
    this.selectedNewsIds = [];//this.newsStories$.map(x => x.id);
  }

  public deselectAllNewsStories() {
    this.newsStoriesViews.forEach(x => { x.isNewsSelected = false; x.cdr.detectChanges(); });
    this.selectedNewsIds = [];
  }

  public showContextMenu(event: MouseEvent) {
    this.contextMenu.show(event);
  }

  public hideContextMenu() {
    this.contextMenu?.hide();
  }

  public handleNewsThemeChange(theme: string) {
    let filter = { ...this.newsStoriesFilter.value };
    filter.theme = theme === this.allNewsThemes ? "" : theme;

    this.newsStoriesFilter.next(filter)
  }

  public ngOnDestroy() {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
