import { useCallback, useEffect, useState } from 'react';
import { GamePage } from './modules/game';
import { QueryProvider } from './shared';
import { Router } from '@yams-tactics/frontend-common';
import { Redirect } from '@yams-tactics/frontend-components';
import { match } from 'ts-pattern';
import { UserArea } from './modules/room';

export function App() {
  // const createRoom = useCallback(() => {
  //   fetch('http://localhost:3000/api/room', { method: 'POST' })
  //     .then((res) => res.json())
  //     .then(({ message }) => {
  //       setMessage(message);
  //     });
  // }, []);

  // useEffect(() => {
  //   const source = new EventSource('/sse');
  //   if (source)
  //     source.addEventListener('message', (message) => {
  //       setMessage(message.data);
  //       return message;
  //     });
  // }, []);

  const route = Router.useRoute(['LoginArea', 'RegisterArea', 'Game']);

  return (
    <QueryProvider>
      {match(route)
        .with({ name: 'LoginArea' }, () => <UserArea />)
        .with({ name: 'RegisterArea' }, () => <UserArea />)
        .with({ name: 'Game' }, () => <GamePage />)
        .otherwise(() => (
          <Redirect to={Router.Login()}></Redirect>
        ))}
    </QueryProvider>
  );
}

export default App;
