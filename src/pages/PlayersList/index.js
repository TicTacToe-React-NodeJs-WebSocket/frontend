import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';

export default function PlayersList() {
  const { authenticated } = useSelector((state) => state.Auth);

  if (authenticated) {
    return <h1>Lista</h1>;
  }
  return <Redirect to="/" />;
}
