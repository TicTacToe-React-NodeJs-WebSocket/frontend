const actions = {
  PUSH_NOTIFICATION: 'PUSH_NOTIFICATION',
  POP_NOTIFICATION: 'POP_NOTIFICATION',

  pushNotification: (type, title, text) => (dispatch) =>
    dispatch({
      type: actions.PUSH_NOTIFICATION,
      payload: {
        type,
        title,
        text,
      },
    }),
  popNotification: () => (dispatch) =>
    dispatch({
      type: actions.POP_NOTIFICATION,
    }),
};

export default actions;
