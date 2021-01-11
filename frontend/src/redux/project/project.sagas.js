import { takeEvery, call, put, all, takeLatest } from 'redux-saga/effects';

import ProjectActionTypes from './project.types';
import UserActionTypes from '../user/user.types';
import ProjectService from '../../services/project.service';

import { fetchProjectsSuccess, fetchProjectsFailure, createProjectSuccess, createProjectFailure, clearProjects } from './project.actions';

export function* fetchProjects() {
  try {
    const projects = yield call(ProjectService.getAll);
    yield put(fetchProjectsSuccess(projects));
  } catch (error) {
    yield put(fetchProjectsFailure(error));
  }
}

export function* createProject(project) {
  try {
    const createdProject = yield call(ProjectService.create, project.payload);
    yield put(createProjectSuccess(createdProject));
  } catch (error) {
    yield put(createProjectFailure(error));
  }
}

export function* clearProjectsOnSignOut() {
  yield put(clearProjects());
}

export function* watchFetchProjectsStart() {
  yield takeEvery(ProjectActionTypes.FETCH_PROJECTS_START, fetchProjects);
}

export function* watchCreateProjectStart() {
  yield takeLatest(ProjectActionTypes.CREATE_PROJECT_START, createProject);
}

export function* watchUserSignOutSuccess() {
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearProjectsOnSignOut);
}

export function* projectSagas() {
  yield all([
    call(watchFetchProjectsStart),
    call(watchCreateProjectStart),
    call(watchUserSignOutSuccess),
  ]);
}