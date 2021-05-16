import actions from './actions';

const initState = {
  notificationsQueue: [],
};

export default (state = initState, action) => {
  let newStack;

  switch (action.type) {
    case actions.PUSH_NOTIFICATION:
      newStack = state.notificationsQueue;
      newStack.push({
        type: action.payload.type,
        title: action.payload.title,
        text: action.payload.text,
      });
      return {
        ...state,
        notificationsQueue: newStack,
      };
    case actions.POP_NOTIFICATION:
      newStack = state.notificationsQueue;
      newStack.shift();
      return {
        ...state,
        notificationsQueue: newStack,
      };
    default:
      return state;
  }
};
