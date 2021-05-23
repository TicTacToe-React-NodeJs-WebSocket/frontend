import axios from 'axios';
import globals from '../../globals';

const actions = {
  CLEAR_ERROR_STATUS: 'CLEAR_ERROR_STATUS',
  REPORT_ERROR: 'REPORT_ERROR',
  REPORT_SUCCESS: 'REPORT_SUCCESS',
  TOGGLE_LOADING: 'TOGGLE_LOADING',
  CREATE_ROOM: 'CREATE_ROOM',
  GET_CURRENT_ROOM: 'GET_CURRENT_ROOM',

  createRoom: (data) => (dispatch) => {
    dispatch(actions.toggleLoading);
    axios
      .post(`${globals.API_URL}/gameRooms/`, data)
      .then((resp) => {
        if (resp.status === 200) {
          dispatch(actions.reportSuccess('Sala Criada com sucesso!'));
          dispatch(actions.toggleLoading());
          dispatch({ type: actions.CREATE_ROOM, payload: resp.data });
        }
      })
      .catch(() => {
        dispatch(actions.reportError('Erro ao criar Sala!'));
        dispatch(actions.toggleLoading());
      });
  },

  getCurrentRoom: (room) => (dispatch) => {
    console.log('--action');
    console.log(room);
    dispatch(actions.toggleLoading());
    axios
      .get(`${globals.API_URL}/gameRooms/${room.roomID}`)
      .then((resp) => {
        if (resp.status === 200) {
          dispatch({
            type: 'GET_CURRENT_ROOM',
            payload: {
              room: resp.data.room,
            },
          });
          dispatch(actions.toggleLoading());
        }
      })
      .catch(() => {
        dispatch(actions.reportError('Erro ao carregar sala!'));
        dispatch(actions.toggleLoading());
      });
  },

  clearRoomStatus: () => (dispatch) =>
    dispatch({ type: actions.CLEAR_ERROR_STATUS }),

  reportError: (message) => (dispatch) =>
    dispatch({ type: actions.REPORT_ERROR, payload: { message } }),

  reportSuccess: (message) => (dispatch) =>
    dispatch({
      type: actions.REPORT_SUCCESS,
      payload: { message },
    }),

  toggleLoading: () => (dispatch) => dispatch({ type: actions.TOGGLE_LOADING }),
};

export default actions;
