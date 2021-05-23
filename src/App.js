import 'antd/dist/antd.css';

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './App.scss';

import socket from './services/socketClient';
import authActions from './redux/auth/actions';

import InviteDuel from './components/InviteDuel';

import Routes from './routes';

const { setSocket } = authActions;

function App() {
  const dispatch = useDispatch();

  const handleAcceptedDuel = (data) => {
    // RESPONDNDO O CONVITE
    socket.emit('duelAccepted', data);
  };

  React.useEffect(() => {
    const disconnetFunction = () => {
      socket.emit('disconnet', {
        socketID: socket.id,
      });
    };

    socket.on('connect', () => dispatch(setSocket(socket)));

    socket.on('duelInvitation', (data) => {
      InviteDuel(
        'info',
        `${data.currentUsername} está desafiando você..`,
        data.msg,
        data.currentUsername,
        data.username,
        handleAcceptedDuel
      );
    });
    window.onbeforeunload = disconnetFunction;

    return () => socket.off('disconnet', disconnetFunction);
  });

  return (
    <div className="tic-tac-toe-body">
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
