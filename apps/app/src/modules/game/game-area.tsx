import { match } from 'ts-pattern';
import {
  GameContextProvider,
  Router,
  UserAuthContext,
  useAuth,
} from '@yams-tactics/frontend-common';
import { Button, Redirect } from '@yams-tactics/frontend-components';
import { IsAuthenticatedConsoleGuard } from '../../shared';
import { GamePage } from './page';

export const GameArea = () => {
  const { logout } = useAuth<UserAuthContext>();
  const route = Router.useRoute(['Game']);

  return (
    <IsAuthenticatedConsoleGuard redirectRoute="Register">
      <div className="h-full w-full flex column">
        <div className="h-full">
          {match(route)
            .with({ name: 'Game' }, ({ params: { gameId } }) => (
              <GameContextProvider gameId={gameId}>
                <GamePage />
              </GameContextProvider>
            ))
            .otherwise(() => (
              <Redirect to={Router.Login()}></Redirect>
            ))}
        </div>
      </div>
    </IsAuthenticatedConsoleGuard>
  );
};
