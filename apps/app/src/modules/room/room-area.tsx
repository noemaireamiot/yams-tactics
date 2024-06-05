import { match } from 'ts-pattern';
import {
  Router,
  UserAuthContext,
  useAuth,
} from '@yams-tactics/frontend-common';
import { Button, Redirect } from '@yams-tactics/frontend-components';
import { IsAuthenticatedConsoleGuard } from '../../shared';
import { RoomPage } from './page';
import { RoomListPage } from './list';

export const RoomArea = () => {
  const { logout } = useAuth<UserAuthContext>();
  const route = Router.useRoute(['RoomList', 'RoomPage']);

  return (
    <IsAuthenticatedConsoleGuard redirectRoute="Register">
      <div className="h-full w-full flex column">
        <div className="h-full">
          {match(route)
            .with({ name: 'RoomList' }, () => <RoomListPage />)
            .with({ name: 'RoomPage' }, ({ params: { roomId } }) => (
              <RoomPage roomId={roomId} />
            ))
            .otherwise(() => (
              <Redirect to={Router.Login()}></Redirect>
            ))}
        </div>
        <div className="flex justify-right">
          <Button color="red" onClick={logout}>
            logout
          </Button>
        </div>
      </div>
    </IsAuthenticatedConsoleGuard>
  );
};
