import { combineReducers } from 'redux';

import NotificationsReducer from './notifications/reducer';
import AuthReducer from './auth/reducer';
import UserReducer from './users/reducer';
import GameRoomReducer from './rooms/reducer';

const rootReducer = combineReducers({
  Users: UserReducer,
  Auth: AuthReducer,
  Notifications: NotificationsReducer,
  Rooms: GameRoomReducer,
});

export default rootReducer;
