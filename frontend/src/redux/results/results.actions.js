import ResultsActionTypes from './results.types';

export const fetchSingleResultsStart = () => ({
  type: ResultsActionTypes.FETCH_SINGLE_RESULTS_START,
});

export const fetchSingleResultsSuccess = singleResults => ({
  type: ResultsActionTypes.FETCH_SINGLE_RESULTS_SUCCESS,
  payload: singleResults,
});

export const fetchSingleResultsFailure = error => ({
  type: ResultsActionTypes.FETCH_SINGLE_RESULTS_FAILURE,
  payload: error,
});

export const clearResults = () => ({
  type: ResultsActionTypes.CLEAR_RESULTS,
});