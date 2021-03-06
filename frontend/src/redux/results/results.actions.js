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

export const removeProjectSingleResults = projectId => ({
  type: ResultsActionTypes.REMOVE_PROJECT_SINGLE_RESULTS,
  payload: projectId,
});

export const deleteResultsStart = results => ({
  type: ResultsActionTypes.DELETE_RESULTS_START,
  payload: results,
});

export const deleteResultsSuccess = deletedResults => ({
  type: ResultsActionTypes.DELETE_RESULTS_SUCCESS,
  payload: deletedResults,
});

export const deleteResultsFailure = error => ({
  type: ResultsActionTypes.DELETE_RESULTS_FAILURE,
  payload: error,
});

export const pollSingleResultsStart = resultsId => ({
  type: ResultsActionTypes.POLL_SINGLE_RESULTS_START,
  payload: resultsId,
});

export const pollSingleResultsEnd = () => ({
  type: ResultsActionTypes.POLL_SINGLE_RESULTS_END,
});

export const updateSingleResultsSuccess = results => ({
  type: ResultsActionTypes.UPDATE_SINGLE_RESULTS_SUCCESS,
  payload: results,
});

export const updateSingleResultsFailure = error => ({
  type: ResultsActionTypes.UPDATE_SINGLE_RESULTS_FAILURE,
  payload: error,
});

export const clearResults = () => ({
  type: ResultsActionTypes.CLEAR_RESULTS,
});