import { takeEvery, takeLatest, put, all, call } from 'redux-saga/effects';
import ResultsActionTypes from './results.types';
import UserActionTypes from '../user/user.types';
import ResultsService from '../../services/results.service';

import { fetchSingleResultsFailure, fetchSingleResultsSuccess, clearResults } from './results.actions';

export function* fetchSingleResults() {
  try {
    const singleResults = yield call(ResultsService.getAllSingle);
    yield put(fetchSingleResultsSuccess(singleResults));
  } catch (error) {
    yield put(fetchSingleResultsFailure(error));
  }
}

export function* clearResultsOnSignOut() {
  yield put(clearResults());
}

export function* watchFetchSingleResultsStart() {
  yield takeEvery(ResultsActionTypes.FETCH_SINGLE_RESULTS_START, fetchSingleResults);
}

export function* watchUserSignOutSuccess() {
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearResultsOnSignOut);
}

export function* resultsSagas() {
  yield all([
    call(watchFetchSingleResultsStart),
    call(watchUserSignOutSuccess),
  ]);
}