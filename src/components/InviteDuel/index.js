/* eslint no-nested-ternary: "off" */
import React from 'react';
import { notification, Button } from 'antd';

import { FaTimes, FaGamepad } from 'react-icons/fa';
// import { GrGamepad } from 'react-icons/gr';

const InviteDuel = (type, title, text, inviting, guest, handleAcceptedDuel) => {
  const key = new Date();
  const btn = (
    <>
      <Button
        type="primary"
        size="small"
        onClick={() => {
          notification.close(key);
          handleAcceptedDuel({ inviting, guest, roomID: null });
        }}
      >
        Aceitar
      </Button>
    </>
  );
  return notification[type]({
    rtl: true,
    placement: 'topRight',
    message: title,
    duration: null,
    top: 100,
    description: text,
    closeIcon: <FaTimes />,
    icon: <FaGamepad style={{ color: '#0984e3' }} />,
    btn,
    key,
  });
};

export default InviteDuel;
