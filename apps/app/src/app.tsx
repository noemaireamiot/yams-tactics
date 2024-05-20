import { useCallback, useEffect, useState } from 'react';
import { Game } from './modules/game';
import { createRouter } from '@swan-io/chicane';
import { match } from 'ts-pattern';
import { routesDefinition } from '@yams-tactics/domain';
import { Login } from './modules/room';
import { getLocation, Location } from '@swan-io/chicane';

export const Router = createRouter(routesDefinition);

export function App() {
  const route = Router.useRoute(['Login', 'Room', 'Game']);
  const location: Location = getLocation();
  if (location.path.length === 0) {
    Router.replace('Login');
  }

  // route object is a discriminated union
  return match(route)
    .with({ name: 'Login' }, () => <Login />)
    .with({ name: 'Room' }, () => <h1>Home</h1>)
    .with({ name: 'Game' }, () => <Game />)
    .otherwise(() => <h1>404</h1>);
}

export default App;
