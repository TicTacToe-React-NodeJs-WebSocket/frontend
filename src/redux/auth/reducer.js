import actions from './actions';

const INITIAL_STATE = {
  authenticated: false,
  profilePhoto: null,
  userInfo: null,

  authLoading: false,
  authSuccess: {
    status: false,
    message: '',
  },
  authError: {
    status: false,
    message: '',
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.USER_UPDATED:
      return {
        ...state,
        authenticated: true,
        userInfo: action.payload.user,
        profilePhoto: action.payload.user.profilePhoto,
      };
    case actions.SIGN_IN:
      return {
        ...state,
        authenticated: true,
        userInfo: action.payload.user,
        profilePhoto: action.payload.user.profilePhoto,
      };

    case actions.SIGN_OUT:
      return {
        ...state,
        authenticated: false,
        profilePhoto: null,
        userInfo: null,
      };

    case actions.TOGGLE_LOADING:
      return {
        ...state,
        authLoading: !state.authLoading,
      };

    case actions.REPORT_SUCCESS:
      return {
        ...state,
        authError: {
          status: false,
          message: '',
        },
        authSuccess: {
          status: true,
          message: action.payload.message,
        },
      };

    case actions.REPORT_ERROR:
      return {
        ...state,
        authSuccess: {
          status: false,
          message: '',
        },
        authError: {
          status: true,
          message: action.payload.message,
        },
      };

    case actions.CLEAR_ERROR_STATUS:
      return {
        ...state,
        authSuccess: {
          status: false,
          message: '',
        },
        authError: {
          status: false,
          message: '',
        },
      };

    default:
      return state;
  }
};
