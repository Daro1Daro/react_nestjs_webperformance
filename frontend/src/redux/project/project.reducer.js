import ProjectActionTypes from './project.types';

const INITIAL_STATE = {
  projects: [],
  isFetching: false,
  isCreating: true,
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
    case ProjectActionTypes.CREATE_PROJECT_START:
      return {
        ...state,
        isCreating: true,
      }
    case ProjectActionTypes.CREATE_PROJECT_SUCCESS:
      return {
        ...state,
        projects: state.projects.concat([action.payload]),
        isCreating: false,
      }
    case ProjectActionTypes.CREATE_PROJECT_FAILURE:
      return {
        ...state,
        error: action.payload,
        isCreating: false,
      }
    case ProjectActionTypes.CLEAR_PROJECTS:
      return INITIAL_STATE;
    default:
      return state;
  }
}

export default projectReducer;
