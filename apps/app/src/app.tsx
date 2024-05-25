import { match } from 'ts-pattern';
import { QueryProvider } from './shared';
import {
  Router,
  UserAuthService,
  createUserAuthProvider,
} from '@yams-tactics/frontend-common';
import { Redirect } from '@yams-tactics/frontend-components';
import { GamePage } from './modules/game';
import { PropsWithChildren, ReactNode } from 'react';
import { AuthArea } from './modules/foundation/auth/auth-area';
import { RoomArea } from './modules/room';

const environment = { baseAPI: 'http://localhost:3000/api' };

const userAuthService = new UserAuthService(environment.baseAPI);
const AuthProvider = createUserAuthProvider({ authService: userAuthService });

export function App() {
  const route = Router.useRoute([
    'LoginArea',
    'RegisterArea',
    'RoomArea',
    'GameArea',
  ]);

  return (
    <AuthProvider>
      <QueryProvider>
        {match(route)
          .with({ name: 'RoomArea' }, () => <RoomArea />)
          .with({ name: 'GameArea' }, () => <GamePage />)
          .otherwise(() => (
            <AuthArea />
          ))}
      </QueryProvider>
    </AuthProvider>
  );
}

export default App;
