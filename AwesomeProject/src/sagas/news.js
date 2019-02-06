import {
  call, takeLatest, put
} from 'redux-saga/effects';

import { getnews } from '../modules/services/newsService';
import newsActions, { NewsTypes } from '../redux/news';

export default [
  getNewsListWatcher
]

/*
  Watchers
*/
function* getNewsListWatcher() {
  yield takeLatest(NewsTypes.GET_NEWS, getNewsHandler);
}

/*
  Handlers
*/
function* getNewsHandler({ payload }) {
  try {
    const response = yield call(getnews, payload);
    console.log('what is the response--->', response.articles);
    yield put(newsActions.newsSuccessful(JSON.stringify(response)));
  } catch (error) {
    yield put(newsActions.newsFailure());
  }
}