import axios from 'axios';
import globals from '../../globals';

const actions = {
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT',
  CLEAR_ERROR_STATUS: 'CLEAR_ERROR_STATUS',
  REPORT_ERROR: 'REPORT_ERROR',
  REPORT_SUCCESS: 'REPORT_SUCCESS',
  TOGGLE_LOADING: 'TOGGLE_LOADING',

  authSignIn: (infos) => (dispatch) => {
    dispatch(actions.toggleLoading());
    axios
      .post(`${globals.API_URL}/users/auth`, infos)
      .then((resp) => {
        if (resp.status === 200) {
          dispatch({
            type: actions.SIGN_IN,
            payload: {
              user: resp.data.user,
            },
          });
          dispatch(actions.reportSuccess('Login efetuado com sucesso!'));
          dispatch(actions.toggleLoading());
        } else if (resp.status === 201) {
          dispatch(actions.reportError('Usuário ou senha incorretos!'));
          dispatch(actions.toggleLoading());
        }
      })
      .catch(() => {
        dispatch(actions.reportError('Erro ao efetuar o login!'));
        dispatch(actions.toggleLoading());
      });
  },

  authSignOut: () => (dispatch) => dispatch({ type: actions.SIGN_OUT }),

  clearAuthStatus: () => (dispatch) =>
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
