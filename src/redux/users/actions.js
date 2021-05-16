import axios from 'axios';
import globals from '../../globals';

const actions = {
  CLEAR_ERROR_STATUS: 'CLEAR_ERROR_STATUS',
  REPORT_ERROR: 'REPORT_ERROR',
  REPORT_SUCCESS: 'REPORT_SUCCESS',
  TOGGLE_LOADING: 'TOGGLE_LOADING',

  userRegister: (newUser) => (dispatch) => {
    dispatch(actions.toggleLoading);
    axios
      .post(`${globals.API_URL}/users/register`, newUser)
      .then((resp) => {
        if (resp.status === 200) {
          dispatch(actions.reportSuccess('Usuário cadastrado com sucesso!'));
          dispatch(actions.toggleLoading());
        } else if (resp.status === 201) {
          dispatch(actions.reportError('Usuário já cadastrado!'));
          dispatch(actions.toggleLoading());
        }
      })
      .catch(() => {
        dispatch(actions.reportError('Erro ao cadastrar usuário!'));
        dispatch(actions.toggleLoading());
      });
  },

  clearUserStatus: () => (dispatch) =>
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
