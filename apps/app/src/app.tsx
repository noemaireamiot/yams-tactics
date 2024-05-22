import { match } from 'ts-pattern';
import { QueryProvider } from './shared';
import { Router } from '@yams-tactics/frontend-common';
import { UserArea } from './modules/room/user/user-area';
import { Redirect } from '@yams-tactics/frontend-components';
import { GamePage } from './modules/game';


export function App() {
  const route = Router.useRoute(['LoginArea', 'RegisterArea', 'RoomArea', 'Game']);

  // route object is a discriminated union
  return  <QueryProvider>
  {match(route)
    .with({ name: 'LoginArea' }, () => <UserArea />)
    .with({ name: 'RegisterArea' }, () => <UserArea />)
    .with({ name: 'RoomArea' }, () => <>Todo</>)
    .with({ name: 'Game' }, () => <GamePage />)
    .otherwise(() => (
      <Redirect to={Router.Login()}></Redirect>
    ))}
</QueryProvider>
}

export default App;
