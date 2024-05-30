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
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './locales/en/translation.json';

const environment = { baseAPI: 'http://localhost:3000/api' };

const userAuthService = new UserAuthService(environment.baseAPI);
const AuthProvider = createUserAuthProvider({ authService: userAuthService });

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: translationEN,
    },
  },
  lng: 'en',
  fallbackLng: 'en',

  interpolation: {
    escapeValue: false,
  },
});

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
