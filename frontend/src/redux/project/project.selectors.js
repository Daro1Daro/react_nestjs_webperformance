import { createSelector } from 'reselect';
import memoize from 'lodash.memoize';

const selectProjects = state => state.project;

export const selectProjects = createSelector(
  [selectProjects],
  project => project.projects,
);

export const selectProjectById = memoize(id =>
  createSelector(
    [selectProjects],
    projects => projects ? projects.find(item => item.id === id) : null,
  ),
);
