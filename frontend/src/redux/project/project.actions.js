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

export const clearProjects = () => ({
  type: ProjectActionTypes.CLEAR_PROJECTS,
});