import { createSelector } from 'reselect';
import memoize from 'lodash.memoize';

const selectProject = state => state.project;

export const selectIsFetchingProjects = createSelector(
  [selectProject],
  project => project.isFetching,
);

export const selectProjects = createSelector(
  [selectProject],
  project => project.projects,
);

export const selectIsCreatingProject = createSelector(
  [selectProject],
  project => project.isCreating,
);

export const selectIsCreatingNewTest = createSelector(
  [selectProject],
  project => project.isCreatingTest,
);

export const selectIsDeletingProject = createSelector(
  [selectProject],
  project => project.isDeleting,
);

export const selectOpenCreateProjectDialog = createSelector(
  [selectProject],
  project => project.openCreateProjectDialog,
);

export const selectOpenRunTestDialog = createSelector(
  [selectProject],
  project => project.openRunTestDialog,
);

export const selectProjectById = memoize(id =>
  createSelector(
    [selectProjects],
    projects => projects ? projects.find(item => item.id === id) : null,
  ),
);
