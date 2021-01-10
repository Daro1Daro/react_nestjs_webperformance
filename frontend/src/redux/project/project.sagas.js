import { takeEvery, call, put, all, takeLatest } from 'redux-saga/effects';

import ProjectActionTypes from './project.types';
import UserActionTypes from '../user/user.types';
import ProjectService from '../../services/project.service';

import { fetchProjectsSuccess, fetchProjectsFailure, clearProjects } from './project.actions';

export function* fetchProjects() {
  try {
    const projects = yield call(ProjectService.getAll);
    yield put(fetchProjectsSuccess(projects));
  } catch (error) {
    yield put(fetchProjectsFailure(error));
  }
}

export function* clearProjectsOnSignOut() {
  yield put(clearProjects());
}

export function* watchFetchProjectsStart() {
  yield takeEvery(ProjectActionTypes.FETCH_PROJECTS_START, fetchProjects);
}

export function* watchUserSignOutSuccess() {
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearProjectsOnSignOut);
}

export function* projectSagas() {
  yield all([
    call(watchFetchProjectsStart),
    call(watchUserSignOutSuccess),
  ]);
}