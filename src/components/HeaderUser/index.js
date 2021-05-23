/* eslint-disable react/prop-types */
import './HeaderUser.scss';
import React from 'react';

import { PageHeader, Tag } from 'antd';

export default function HeaderUser({ currentUser, position }) {
  return (
    <PageHeader
      title={currentUser.username}
      subTitle={`${currentUser.score} pts`}
      className="user-header"
      avatar={{
        src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4',
      }}
      tags={<Tag color="blue">{`${position}º Lugar`}</Tag>}
    />
  );
}
