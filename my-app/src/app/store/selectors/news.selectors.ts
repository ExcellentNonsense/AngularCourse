import * as fromReducers from '../reducers';

export function selectNews(state: fromReducers.State) {
  return state.newsObjects.news;
}

export function selectNewsCount(state: fromReducers.State) {
  return state.newsObjects.news?.length;
}

export function selectPolicyNewsCount(state: fromReducers.State) {
  return state.newsObjects.news?.filter(x => x.theme === 'Политика').length;
}

export function selectTourismNewsCount(state: fromReducers.State) {
  return state.newsObjects.news?.filter(x => x.theme === 'Туризм').length;
}

export function selectEconomyNewsCount(state: fromReducers.State) {
  return state.newsObjects.news?.filter(x => x.theme === 'Экономика').length;
}
