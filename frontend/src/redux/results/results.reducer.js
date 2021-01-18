import ResultsActionTypes from './results.types';

const INITIAL_STATE = {
  singleResults: [],
  isFetching: false,
  isDeleting: false,
  error: '',
};

const resultsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ResultsActionTypes.FETCH_SINGLE_RESULTS_START:
      return {
        ...state,
        isFetching: true,
      };
    case ResultsActionTypes.FETCH_SINGLE_RESULTS_SUCCESS:
      return {
        ...state,
        singleResults: action.payload,
        isFetching: false,
        error: '',
      };
    case ResultsActionTypes.FETCH_SINGLE_RESULTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case ResultsActionTypes.REMOVE_PROJECT_SINGLE_RESULTS:
      return {
        ...state,
        singleResults: state.singleResults.filter(results => results.webPage.project.id !== action.payload),
      };
    case ResultsActionTypes.DELETE_RESULTS_START:
      return {
        ...state,
        isDeleting: true,
      };
    case ResultsActionTypes.DELETE_RESULTS_SUCCESS:
      return {
        ...state,
        isDeleting: false,
        singleResults: state.singleResults.filter(results => results.id !== action.payload.id),
      };
    case ResultsActionTypes.DELETE_RESULTS_FAILURE:
      return {
        ...state,
        isDeleting: false,
        error: action.payload,
      };
    case ResultsActionTypes.UPDATE_SINGLE_RESULTS_SUCCESS:
      return {
        ...state,
        singleResults: state.singleResults.map(results => results.id === action.payload.id ? action.payload : results),
      };
    case ResultsActionTypes.UPDATE_SINGLE_RESULTS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case ResultsActionTypes.CLEAR_RESULTS:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default resultsReducer;