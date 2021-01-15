import ResultsActionTypes from './results.types';

const INITIAL_STATE = {
  singleResults: [],
  isFetchingSingleResults: false,
  error: '',
};

const resultsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ResultsActionTypes.FETCH_SINGLE_RESULTS_START:
      return {
        ...state,
        isFetching: true,
      }
    case ResultsActionTypes.FETCH_SINGLE_RESULTS_SUCCESS:
      return {
        ...state,
        singleResults: action.payload,
        isFetching: false,
        error: '',
      }
    case ResultsActionTypes.FETCH_SINGLE_RESULTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      }
    case ResultsActionTypes.REMOVE_PROJECT_SINGLE_RESULTS:
      return {
        ...state,
        singleResults: state.results.filter(r => r.webPage.project.id !== action.payload),
      }
    case ResultsActionTypes.CLEAR_RESULTS:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default resultsReducer;