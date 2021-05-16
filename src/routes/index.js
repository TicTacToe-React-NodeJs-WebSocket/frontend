import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Home from '../pages/Home';
import Game from '../pages/Game';
import PlayersList from '../pages/PlayersList';

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
    path: '/playersList',
    exact: true,
    component: PlayersList,
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
