import ProjectActionTypes from './project.types';

export const fetchProjectsStart = () => ({
  type: ProjectActionTypes.FETCH_PROJECTS_START,
});

export const fetchProjectsSuccess = projects => ({
  type: ProjectActionTypes.FETCH_PROJECTS_SUCCESS,
  payload: projects,
});

export const fetchProjectsFailure = error => ({
  type: ProjectActionTypes.FETCH_PROJECTS_FAILURE,
  payload: error,
});

export const createProjectStart = data => ({
  type: ProjectActionTypes.CREATE_PROJECT_START,
  payload: data,
});

export const createProjectSuccess = project => ({
  type: ProjectActionTypes.CREATE_PROJECT_SUCCESS,
  payload: project,
});

export const createProjectFailure = error => ({
  type: ProjectActionTypes.CREATE_PROJECT_FAILURE,
  payload: error,
});

export const createProjectAndRunTest = projectWebPageAndConfig => ({
  type: ProjectActionTypes.CREATE_PROJECT_AND_RUN_TEST,
  payload: projectWebPageAndConfig,
});

export const deleteProjectStart = project => ({
  type: ProjectActionTypes.DELETE_PROJECT_START,
  payload: project,
});

export const deleteProjectSuccess = deletedProject => ({
  type: ProjectActionTypes.DELETE_PROJECT_SUCCESS,
  payload: deletedProject,
});

export const deleteProjectFailure = error => ({
  type: ProjectActionTypes.DELETE_PROJECT_FAILURE,
  payload: error,
});

// do cyklicznych testów tworzenia
export const createWebPageStart = data => ({
  type: ProjectActionTypes.CREATE_WEB_PAGE_START,
  payload: data,
});

export const createWebPageSuccess = webPage => ({
  type: ProjectActionTypes.CREATE_WEB_PAGE_SUCCESS,
  payload: webPage,
});

export const createWebPageFailure = error => ({
  type: ProjectActionTypes.CREATE_WEB_PAGE_FAILURE,
  payload: error,
});

export const clearProjects = () => ({
  type: ProjectActionTypes.CLEAR_PROJECTS,
});