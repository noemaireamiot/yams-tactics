import { match } from 'ts-pattern';
import { Login, Register } from './components';
import {
  Router,
  UserAuthContext,
  useAuth,
} from '@yams-tactics/frontend-common';
import { Redirect } from '@yams-tactics/frontend-components';

export const AuthArea = () => {
  const { auth } = useAuth<UserAuthContext>();

  const route = Router.useRoute(['LoginArea', 'RegisterArea']);

  if (auth.isAuthenticated) {
    const to = Router.RoomList();

    return <Redirect to={to} />;
  }

  return match(route)
    .with({ name: 'LoginArea' }, () => <Login />)
    .with({ name: 'RegisterArea' }, () => <Register />)
    .otherwise(() => <Redirect to={Router.Login()}></Redirect>);
};
