import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { useHistory } from 'react-router-dom';

import Table from '../../components/Table';
import HeaderUser from '../../components/HeaderUser';
import LoginNotification from '../../components/LoginNotification';

import usersActions from '../../redux/users/actions';
import roomsActions from '../../redux/rooms/actions';

const { getAllUsers } = usersActions;
const { getCurrentRoom } = roomsActions;
export default function PlayersList() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [visible, setVisible] = React.useState();
  const { userInfo, authenticated, socketInstance } = useSelector(
    (state) => state.Auth
  );

  const { allUsers } = useSelector((state) => state.Users);

  React.useEffect(() => {
    if (!allUsers) {
      dispatch(getAllUsers());
    }
    const getUsers = (data) => {
      if (data && data.username !== userInfo.username && !visible) {
        setVisible(true);
        LoginNotification(data.username);
        dispatch(getAllUsers());
      }
    };
    const disconnet = () => {
      if (authenticated && userInfo) {
        dispatch(getAllUsers());
      }
    };

    const getRoom = (room) => {
      if (
        authenticated &&
        (userInfo.username === room.username1 ||
          userInfo.username === room.username2)
      ) {
        dispatch(getCurrentRoom(room));
        history.push('/game');
      }
    };
    if (socketInstance) {
      socketInstance.on('login', getUsers);
      socketInstance.on('disconnet', disconnet);
      socketInstance.on('duelAccepted', getRoom);
      socketInstance.on('winner', disconnet);
    }
    return () =>
      socketInstance
        ? socketInstance.emit('disconnet', { socketID: socketInstance.id })
        : null;
  }, [socketInstance]);

  const handleDuelInvitation = (data) => {
    socketInstance.emit('duelInvitation', data);
  };

  if (authenticated) {
    return (
      <>
        {userInfo && allUsers && allUsers.length > 0 ? (
          <>
            <HeaderUser
              currentUser={userInfo}
              position={
                allUsers.findIndex(
                  (user) => user.username === userInfo.username
                ) + 1
              }
            />
            <Table
              data={allUsers}
              currentUser={userInfo}
              handleDuelInvitation={handleDuelInvitation}
            />
          </>
        ) : null}
      </>
    );
  }
  return <Redirect to="/" />;
}
