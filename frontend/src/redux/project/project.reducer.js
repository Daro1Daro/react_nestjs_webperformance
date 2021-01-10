import ProjectActionTypes from './project.types';

const INITIAL_STATE = {
  projects: null,
  isFetching: false,
  error: '',
};

const projectReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ProjectActionTypes.FETCH_PROJECTS_START:
      return {
        ...state,
        isFetching: true,
      };
    case ProjectActionTypes.FETCH_PROJECTS_SUCCESS:
      return {
        ...state,
        projects: action.payload,
        isFetching: false,
        error: '',
      };
    case ProjectActionTypes.FETCH_PROJECTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case ProjectActionTypes.CLEAR_PROJECTS:
      return INITIAL_STATE;
    default:
      return state;
  }
}

export default projectReducer;
