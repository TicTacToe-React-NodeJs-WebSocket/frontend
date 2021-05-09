import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Home from '../pages/Home';
import Game from '../pages/Game';

const routes = [
  {
    path: '/signIn',
    exact: true,
    component: SignIn,
  },
  {
    path: '/signUp',
    exact: true,
    component: SignUp,
  },
  {
    path: '/game',
    exact: true,
    component: Game,
  },
  {
    path: '/',
    exact: true,
    component: Home,
  },
];

export default function Routes() {
  return (
    <Switch>
      {routes.map(({ path, exact, component: Component }) => (
        <Route key={path} path={path} exact={exact} component={Component} />
      ))}
    </Switch>
  );
}
