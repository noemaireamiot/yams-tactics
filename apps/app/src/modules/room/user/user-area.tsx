import { Router } from '@yams-tactics/frontend-common';
import { UserPage } from './page';

export function UserArea() {
  const route = Router.useRoute(['Login', 'Register']);

  return <UserPage />;
}
