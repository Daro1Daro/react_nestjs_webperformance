import ProjectActionTypes from './project.types';

const INITIAL_STATE = {
  projects: [],
  webPages: [],
  isFetching: false,
  isCreating: false,
  isCreatingTest: false,
  isDeleting: false,
  error: '',
  openCreateProjectDialog: false,
  openRunTestDialog: false,
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
    case ProjectActionTypes.CREATE_PROJECT_AND_RUN_TEST:
      return {
        ...state,
        isCreating: true,
      };
    case ProjectActionTypes.CREATE_PROJECT_SUCCESS:
      return {
        ...state,
        projects: state.projects.concat([action.payload]),
        isCreating: false,
      };
    case ProjectActionTypes.CREATE_PROJECT_FAILURE:
      return {
        ...state,
        error: action.payload,
        isCreating: false,
      };
    case ProjectActionTypes.DELETE_PROJECT_START:
      return {
        ...state,
        isDeleting: true,
      };
    case ProjectActionTypes.DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        isDeleting: false,
        projects: state.projects.filter(project => project.id !== action.payload.id),
      };
    case ProjectActionTypes.DELETE_PROJECT_FAILURE:
      return {
        ...state,
        isDeleting: false,
        error: action.payload,
      };
    case ProjectActionTypes.RUN_TEST_START:
      return {
        ...state,
        isCreatingTest: true,
      };
    case ProjectActionTypes.RUN_TEST_SUCCESS:
      return {
        ...state,
        isCreatingTest: false,
      };
    case ProjectActionTypes.RUN_TEST_FAILURE:
      return {
        ...state,
        isCreatingTest: false,
        error: action.payload,
      };
    case ProjectActionTypes.CREATE_WEB_PAGE_SUCCESS:
      return {
        ...state,
        webPages: state.webPages.concat([action.payload]),
      };
    case ProjectActionTypes.OPEN_CREATE_PROJECT_DIALOG:
      return {
        ...state,
        openCreateProjectDialog: true,
      };
    case ProjectActionTypes.CLOSE_CREATE_PROJECT_DIALOG:
      return {
        ...state,
        openCreateProjectDialog: false,
      };
    case ProjectActionTypes.OPEN_RUN_TEST_DIALOG:
      return {
        ...state,
        openRunTestDialog: true,
      };
    case ProjectActionTypes.CLOSE_RUN_TEST_DIALOG:
      return {
        ...state,
        openRunTestDialog: false,
      };
    case ProjectActionTypes.CLEAR_PROJECTS:
      return INITIAL_STATE;
    default:
      return state;
  }
}

export default projectReducer;
