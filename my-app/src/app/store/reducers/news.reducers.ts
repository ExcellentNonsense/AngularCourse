import { Action, createReducer, on } from '@ngrx/store';
import { News } from '../../models/news';
import * as fromActions from '../actions';

export interface NewsState {
  news?: News[]
}

const initialState: NewsState = {}

const newsReducer = createReducer(
  initialState,
  on(fromActions.loadNewsSuccess, (state, { news }) => ({ ...state, news: news })),
  on(fromActions.editNewsSuccess, (state, { newsStory }) => ({
    ...state,
    news: state.news?.map(
      ns => {
        if (ns.id == newsStory.id) {
          return {
            ...ns,
            date: newsStory.date,
            headline: newsStory.headline,
            text: newsStory.text,
            theme: newsStory.theme
          }
        }
        else {
          return ns;
        }
      })
  }))
);

export function reducer(state: NewsState | undefined, action: Action): NewsState {
  return newsReducer(state, action);
}
