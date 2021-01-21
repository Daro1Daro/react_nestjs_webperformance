import { take, race, takeEvery, takeLatest, put, all, call, delay } from 'redux-saga/effects';

import ResultsActionTypes from './results.types';
import UserActionTypes from '../user/user.types';
import ResultsService from '../../services/results.service';
import { TestStatus } from '../../common/consts';

import {
  fetchSingleResultsFailure, fetchSingleResultsSuccess,
  deleteResultsSuccess, deleteResultsFailure,
  updateSingleResultsSuccess, updateSingleResultsFailure,
  pollSingleResultsEnd,
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

export function* pollSingleResults(action) {
  while (true) {
    try {
      const results = yield call(ResultsService.get, action.payload);
      if (results?.status === TestStatus.SUCCESS) {
        yield put(updateSingleResultsSuccess(results));
        yield put(pollSingleResultsEnd());
      }
      yield delay(5000);
    } catch (error) {
      yield put(updateSingleResultsFailure(error));
      yield put(pollSingleResultsEnd());
    }
  }
}

export function* watchPollSingleResultsStart() {
  while (true) {
    const action = yield take(ResultsActionTypes.POLL_SINGLE_RESULTS_START);
    yield race({
        poll: call(pollSingleResults, action),
        cancel: take(ResultsActionTypes.POLL_SINGLE_RESULTS_END),
      },
    );
  }
}

export function* resultsSagas() {
  yield all([
    call(watchFetchSingleResultsStart),
    call(watchDeleteResultsStart),
    call(watchDeleteProjectSuccess),
    call(watchUserSignOutStart),
    call(watchPollSingleResultsStart),
  ]);
}