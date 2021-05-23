import React from 'react';
import { useSelector } from 'react-redux';
import './Game.scss';
import { Redirect } from 'react-router';
import Board from '../../components/Board';

export default function Game() {
  const { userInfo, authenticated } = useSelector((state) => state.Auth);
  const { currentRoom } = useSelector((state) => state.Rooms);

  if (authenticated) {
    return (
      <>
        {currentRoom &&
        (userInfo.username === currentRoom.Player1.username ||
          userInfo.username === currentRoom.Player2.username) ? (
          <Board currentRoom={currentRoom} />
        ) : null}
      </>
    );
  }

  return <Redirect to="/" />;
}
