import { createSelector } from 'reselect';
import memoize from 'lodash.memoize';

const selectProject = state => state.project;

export const selectProjects = createSelector(
  [selectProject],
  project => project.projects,
);

export const selectProjectById = memoize(id =>
  createSelector(
    [selectProjects],
    projects => projects ? projects.find(item => item.id === id) : null,
  ),
);
