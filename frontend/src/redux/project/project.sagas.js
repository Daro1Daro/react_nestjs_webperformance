import { takeEvery, call, put, all, takeLatest } from 'redux-saga/effects';

import ProjectActionTypes from './project.types';
import UserActionTypes from '../user/user.types';
import ProjectService from '../../services/project.service';

import {
  fetchProjectsSuccess, fetchProjectsFailure,
  createProjectSuccess, createProjectFailure,
  deleteProjectSuccess, deleteProjectFailure,
  createWebPageSuccess, createWebPageFailure,
  runTestSuccess, runTestFailure,
  closeCreateProjectDialog,
  closeRunTestDialog,
  clearProjects,
} from './project.actions';

import {
  fetchSingleResultsStart,
} from '../results/results.actions';

export function* fetchProjects() {
  try {
    const projects = yield call(ProjectService.getAll);
    yield put(fetchProjectsSuccess(projects));
  } catch (error) {
    yield put(fetchProjectsFailure(error));
  }
}

export function* createProject(action) {
  try {
    const createdProject = yield call(ProjectService.create, action.payload);
    yield put(createProjectSuccess(createdProject));
    yield put(closeCreateProjectDialog());
  } catch (error) {
    yield put(createProjectFailure(error));
  }
}

export function* createWebPage(action) {
  try {
    const createdWebPage = yield call(ProjectService.createWebPage, action.payload);
    yield put(createWebPageSuccess(createdWebPage));
  } catch (error) {
    yield put(createWebPageFailure(error));
  }
}

export function* createProjectAndRunTest(action) {
  const { project, webPage, config } = action.payload;
  try {
    const createdProject = yield call(ProjectService.create, project);
    const createdWebPage = yield call(ProjectService.createWebPage, { projectId: createdProject.id, ...webPage });
    yield call(ProjectService.runSingleTest, config, createdWebPage.id);
    yield put(fetchSingleResultsStart());
    yield put(createWebPageSuccess(createdWebPage));
    yield put(createProjectSuccess(createdProject));
    yield put(closeCreateProjectDialog());
  } catch (error) {
    yield put(createProjectFailure(error));
  }
}

export function* runTest(action) {
  const { projectId, webPage, config } = action.payload;
  try {
    const createdWebPage = yield call(ProjectService.createWebPage, { projectId: projectId, ...webPage });
    yield call(ProjectService.runSingleTest, config, createdWebPage.id);
    yield put(fetchSingleResultsStart());
    yield put(createWebPageSuccess(createdWebPage));
    yield put(runTestSuccess());
    yield put(closeRunTestDialog());
  } catch (error) {
    yield put(runTestFailure(error));
  }
}

export function* deleteProject(action) {
  try {
    const deletedProject = yield call(ProjectService.delete, action.payload);
    yield put(deleteProjectSuccess(deletedProject));
  } catch (error) {
    yield put(deleteProjectFailure(error));
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

export function* watchCreateWebPageStart() {
  yield takeLatest(ProjectActionTypes.CREATE_WEB_PAGE_START, createWebPage);
}

export function* watchCreateProjectAndRunTest() {
  yield takeLatest(ProjectActionTypes.CREATE_PROJECT_AND_RUN_TEST, createProjectAndRunTest);
}

export function* watchRunTestStart() {
  yield takeLatest(ProjectActionTypes.RUN_TEST_START, runTest);
}

export function* watchDeleteProjectStart() {
  yield takeLatest(ProjectActionTypes.DELETE_PROJECT_START, deleteProject);
}

export function* watchUserSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, clearProjectsOnSignOut);
}

export function* projectSagas() {
  yield all([
    call(watchFetchProjectsStart),
    call(watchCreateProjectStart),
    call(watchDeleteProjectStart),
    call(watchCreateWebPageStart),
    call(watchCreateProjectAndRunTest),
    call(watchRunTestStart),
    call(watchUserSignOutStart),
  ]);
}