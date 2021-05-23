/* eslint no-nested-ternary: "off" */
import React from 'react';
import { notification, Button } from 'antd';

import { FaTimes } from 'react-icons/fa';
import { FiLogIn } from 'react-icons/fi';

const LoginNotification = (username) => {
  const btn = (
    <>
      <Button
        type="primary"
        size="small"
        // onClick={() => notification.close(key)}
      >
        Aceitar
      </Button>
    </>
  );
  return notification.open({
    rtl: true,
    placement: 'topRight',
    message: 'Parece que alguém está online...',
    duration: 4,
    top: 100,
    description: `O usuário ${username} está online e pronto para um desafio, gostaria de duelar com ele?`,
    closeIcon: <FaTimes />,
    icon: <FiLogIn />,
    btn,
  });
};

export default LoginNotification;
