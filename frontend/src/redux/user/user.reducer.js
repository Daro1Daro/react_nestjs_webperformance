import UserActionTypes from './user.types';

const INITIAL_STATE = {
  currentUser: null,
  error: null,
  signUpError: null,
  signUpSuccess: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: null,
      };
    case UserActionTypes.SIGN_IN_FAILURE:
    case UserActionTypes.SIGN_OUT_FAILURE:
      return {
        ...state,
        currentUser: null,
        error: action.payload,
      };
    case UserActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        error: null,
      };
    case UserActionTypes.SIGN_UP_FAILURE:
      return {
        ...state,
        signUpSuccess: false,
        signUpError: action.payload,
      };
    case UserActionTypes.SIGN_UP_SUCCESS:
      return {
        ...state,
        signUpSuccess: true,
        signUpError: null,
      };
    default:
      return state;
  }
};

export default userReducer;
