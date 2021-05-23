/* eslint-disable react/prop-types */
import './Table.scss';
import React from 'react';

import { Table, Button, Tag, Popover, Input } from 'antd';

export default function TableUsers({
  data,
  currentUser,
  handleDuelInvitation,
}) {
  const [msg, setMsg] = React.useState('');

  const handleMessageChange = (event) => {
    setMsg(event.target.value);
  };

  const viewColumns = [
    {
      title: 'Posição',
      width: '5%',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      width: '15%',
    },
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
      width: '15%',
    },
    {
      title: 'Pontuação',
      dataIndex: 'score',
      key: 'score',
      width: '15%',
    },
    {
      title: 'Status',
      key: 'status',
      width: '15%',
      render: (text, singleUser) => {
        let cor;
        if (singleUser.status === 'Offline') {
          cor = '#f50';
        } else if (singleUser.status === 'Duelando') {
          cor = '#2db7f5';
        } else {
          cor = '#87d068';
        }

        return <Tag color={cor}>{singleUser.status}</Tag>;
      },
    },
    {
      title: '',
      dataIndex: 'edit',
      width: '10%',
      rowKey: 'edit',
      render: (text, singleUser) =>
        singleUser.status === 'Offline' ||
        singleUser.status === 'Duelando' ||
        singleUser.username === currentUser.username ? (
          ''
        ) : (
          <Popover
            title={`Duelar com ${singleUser.username}?`}
            trigger="click"
            content={
              <>
                <Input.TextArea
                  placeholder="Diga alguma coisa..."
                  allowClear
                  onChange={handleMessageChange}
                  value={msg}
                />

                <Button
                  type="primary"
                  size="small"
                  style={{
                    position: 'relative',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    marginTop: '15px',
                  }}
                  onClick={() =>
                    handleDuelInvitation({
                      username: singleUser.username,
                      msg,
                      socketID: singleUser.socketID,
                      currentUsername: currentUser.username,
                    })
                  }
                >
                  Enviar
                </Button>
              </>
            }
          >
            <Button type="primary">Duelar</Button>
          </Popover>
        ),
    },
  ];
  // console.log('-------------------------');
  // console.log(msg);
  // console.log('-------------------------');
  return (
    <div className="container-table">
      <Table columns={viewColumns} dataSource={data} />
    </div>
  );
}
