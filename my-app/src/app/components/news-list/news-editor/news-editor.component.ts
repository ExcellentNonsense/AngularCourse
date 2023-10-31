import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsStoriesService } from '../../../services/news-stories.service';
import { HttpErrorResponse } from '@angular/common/http';
import { News } from '../../../models/news';
import { NewsThemesService } from '../../../services/news-themes.service';
import { Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromStore from '../../../store';

@Component({
  selector: 'ac-news-editor',
  templateUrl: './news-editor.component.html',
  styleUrls: ['./news-editor.component.css']
})
export class NewsEditorComponent implements OnInit {
  private newsStoryId!: number;
  private newsStory!: News;
  private isEditMode: boolean = false;
  private destroy$ = new Subject();

  public newsThemes: string[] = [];
  public newsForm!: FormGroup;

  public get editorTitle() { return this.isEditMode ? "Изменить новость" : "Добавить новость" };

  constructor(
    private fb: FormBuilder,
    private newsStoriesService: NewsStoriesService,
    private store: Store<fromStore.State>,
    private newsThemesService: NewsThemesService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
    this.newsThemesService.getThemes().pipe(takeUntil(this.destroy$)).subscribe(
      themes => this.newsThemes = themes,
      (error: HttpErrorResponse) => console.log(error.status + ' ' + error.message)
    );
  }

  ngOnInit() {
    this.newsForm = this.fb.group({
      date: this.fb.control("", Validators.required),
      headline: this.fb.control("", [Validators.required, Validators.maxLength(200)]),
      text: this.fb.control("", [Validators.required, Validators.maxLength(5000)]),
      theme: this.fb.control("")
    });

    this.route.params.subscribe(params => {
      this.newsStoryId = params['news-id'];

      if (this.newsStoryId) {
        this.isEditMode = true;

        this.newsStoriesService.getNewsStoryById(params['news-id']).subscribe(
          newsStory => {
            this.newsStory = newsStory;

            this.newsForm.patchValue({
              date: newsStory.date,
              headline: newsStory.headline,
              text: newsStory.text,
              theme: newsStory.theme
            })
          },
          (error: HttpErrorResponse) => console.log(error.status + ' ' + error.message)
        );
      }
    });
  }

  get date() { return this.newsForm.get("date") as AbstractControl; }
  get headline() { return this.newsForm.get("headline") as AbstractControl; }
  get text() { return this.newsForm.get("text") as AbstractControl; }
  get theme() { return this.newsForm.get("theme") as AbstractControl; }

  public addNews() {
    let news = new News(
      0,
      this.date!.value,
      this.headline!.value,
      this.text!.value,
      this.theme!.value
    );

    this.newsStoriesService.addNews(news);
  }

  public saveNewsChanges() {
    let news = new News(
      this.newsStoryId,
      this.date!.value !== undefined ? this.date.value : this.newsStory.date,
      this.headline!.value !== undefined ? this.headline.value : this.newsStory.headline,
      this.text!.value !== undefined ? this.text.value : this.newsStory.text,
      this.theme!.value !== undefined ? this.theme.value : this.newsStory.theme
    );

    this.store.dispatch(fromStore.editNews({ newsStory: news }));
  }

  public save() {
    if (this.isEditMode) {
      this.saveNewsChanges();
    }
    else {
      this.addNews();
    }

    this.close();
  }

  public close() {
    this.router.navigate([{ outlets: { newsEditor: null } }]);
    this.cdr.detectChanges();
  }

  public ngOnDestroy() {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
