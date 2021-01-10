import { createSelector } from 'reselect';
import memoize from 'lodash.memoize';

const selectResults = state => state.results;

export const selectIsFetchingSingleResults = createSelector(
  [selectResults],
  results => results.isFetchingSingleResults,
);

export const selectSingleResults = createSelector(
  [selectResults],
  results => results.singleResults,
);

export const selectSingleResultsById = memoize(id =>
  createSelector(
    [selectSingleResults],
    results => results ? results.find(item => item.id === id) : null,
  ),
);
