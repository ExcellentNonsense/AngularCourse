import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { select, Store } from "@ngrx/store";
import { map, switchMap, withLatestFrom } from "rxjs";
import { News } from "../../models/news";
import { NewsStoriesService } from "../../services/news-stories.service";
import * as fromActions from '../actions';
import * as fromReducers from '../reducers';
import * as fromSelectors from '../selectors';

@Injectable()
export class NewsEffects {
  constructor(
    private newsStoriesService: NewsStoriesService,
    private actions$: Actions,
    private store$: Store<fromReducers.State>
  ) { }

  getNews$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.loadNews),
      withLatestFrom(this.store$.pipe(select(fromSelectors.selectNews))),
      switchMap(([, _newsObjs]) => {
        if (_newsObjs) {
          return [fromActions.loadNewsSuccess({ news: _newsObjs })]
        }

        return this.newsStoriesService.getNewsStories().pipe(
          map((_newsObjs: News[]) => {
            return fromActions.loadNewsSuccess({ news: _newsObjs });
          })
        )
      })
    )
  )

  editNews$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.editNews),
      switchMap(action => {
        this.newsStoriesService.updateNews(action.newsStory);
        return [fromActions.editNewsSuccess(action)]
      })
    )
  )
}
