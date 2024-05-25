import { match } from 'ts-pattern';
import { Router } from '@yams-tactics/frontend-common';
import { Redirect } from '@yams-tactics/frontend-components';
import { IsAuthenticatedConsoleGuard } from '../../shared';

export const RoomArea = () => {
  const route = Router.useRoute(['RoomList']);

  return (
    <IsAuthenticatedConsoleGuard redirectRoute="Register">
      {match(route)
        .with({ name: 'RoomList' }, () => <>TODO</>)
        .otherwise(() => (
          <Redirect to={Router.Login()}></Redirect>
        ))}
    </IsAuthenticatedConsoleGuard>
  );
};
