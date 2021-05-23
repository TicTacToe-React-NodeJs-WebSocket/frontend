import actions from './actions';

const INITIAL_STATE = {
  profilePhotoChanged: false,
  userLoading: false,
  allUsers: null,
  userSuccess: {
    status: false,
    message: '',
  },
  userError: {
    status: false,
    message: '',
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.GET_ALL_USERS:
      return {
        ...state,
        allUsers: action.payload.allUsers,
      };
    case actions.TOGGLE_LOADING:
      return {
        ...state,
        userLoading: !state.userLoading,
      };
    case actions.REPORT_SUCCESS:
      return {
        ...state,
        userError: {
          status: false,
          message: '',
        },
        userSuccess: {
          status: true,
          message: action.payload.message,
        },
      };

    case actions.REPORT_ERROR:
      return {
        ...state,
        userSuccess: {
          status: false,
          message: '',
        },
        userError: {
          status: true,
          message: action.payload.message,
        },
      };

    case actions.CLEAR_ERROR_STATUS:
      return {
        ...state,
        userSuccess: {
          status: false,
          message: '',
        },
        userError: {
          status: false,
          message: '',
        },
      };

    default:
      return state;
  }
};
