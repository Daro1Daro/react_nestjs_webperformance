import { takeEvery, takeLatest, put, all, call } from 'redux-saga/effects';

import ResultsActionTypes from './results.types';
import UserActionTypes from '../user/user.types';
import ResultsService from '../../services/results.service';

import {
  fetchSingleResultsFailure, fetchSingleResultsSuccess,
  deleteResultsSuccess, deleteResultsFailure,
  clearResults,
  removeProjectSingleResults,
} from './results.actions';
import ProjectActionTypes from '../project/project.types';

export function* fetchSingleResults() {
  try {
    const singleResults = yield call(ResultsService.getAllSingle);
    yield put(fetchSingleResultsSuccess(singleResults));
  } catch (error) {
    yield put(fetchSingleResultsFailure(error));
  }
}

export function* deleteResults(action) {
  try {
    const deletedResults = yield call(ResultsService.delete, action.payload);
    yield put(deleteResultsSuccess(deletedResults));
  } catch (error) {
    yield put(deleteResultsFailure(error));
  }
}

export function* removeSingleResults(action) {
  const { id } = action.payload;
  yield put(removeProjectSingleResults(id));
}

export function* clearResultsOnSignOut() {
  yield put(clearResults());
}

export function* watchFetchSingleResultsStart() {
  yield takeEvery(ResultsActionTypes.FETCH_SINGLE_RESULTS_START, fetchSingleResults);
}

export function* watchDeleteResultsStart() {
  yield takeEvery(ResultsActionTypes.DELETE_RESULTS_START, deleteResults);
}

export function* watchUserSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, clearResultsOnSignOut);
}

export function* watchDeleteProjectSuccess() {
  yield takeLatest(ProjectActionTypes.DELETE_PROJECT_SUCCESS, removeSingleResults);
}

export function* resultsSagas() {
  yield all([
    call(watchFetchSingleResultsStart),
    call(watchDeleteResultsStart),
    call(watchDeleteProjectSuccess),
    call(watchUserSignOutStart),
  ]);
}