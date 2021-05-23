import actions from './actions';

const INITIAL_STATE = {
  roomLoading: false,
  currentRoom: null,
  roomSuccess: {
    status: false,
    message: '',
  },
  roomError: {
    status: false,
    message: '',
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.GET_CURRENT_ROOM:
      return {
        ...state,
        currentRoom: action.payload.room,
      };
    case actions.TOGGLE_LOADING:
      return {
        ...state,
        roomLoading: !state.roomLoading,
      };
    case actions.REPORT_SUCCESS:
      return {
        ...state,
        roomError: {
          status: false,
          message: '',
        },
        roomSuccess: {
          status: true,
          message: action.payload.message,
        },
      };

    case actions.REPORT_ERROR:
      return {
        ...state,
        roomSuccess: {
          status: false,
          message: '',
        },
        roomError: {
          status: true,
          message: action.payload.message,
        },
      };

    case actions.CLEAR_ERROR_STATUS:
      return {
        ...state,
        roomSuccess: {
          status: false,
          message: '',
        },
        roomError: {
          status: false,
          message: '',
        },
      };

    default:
      return state;
  }
};
