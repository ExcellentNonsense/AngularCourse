import { createAction, props } from '@ngrx/store';
import { News } from '../../models/news';

export const loadNews = createAction('[News List] Load News');

export const loadNewsSuccess = createAction(
  '[News List] Load News Success',
  props<{ news: News[] }>()
);

export const editNews = createAction(
  '[News List] Edit News',
  props<{ newsStory: News }>()
);

export const editNewsSuccess = createAction(
  '[News List] Edit News Success',
  props<{ newsStory: News }>()
);
