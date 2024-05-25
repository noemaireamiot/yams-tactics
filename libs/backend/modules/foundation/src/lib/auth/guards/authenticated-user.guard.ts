import { CanActivate, Injectable } from '@nestjs/common';
import { User } from '@yams-tactics/backend-database';

/**
 * Guard to let pass only authenticated `User`
 *
 * Using our ContextModule
 */
@Injectable()
export class AuthenticatedUserGuard implements CanActivate {
  constructor() {}

  public async canActivate() {
    // todo
    const user: unknown = null;

    if (user !== null && user instanceof User) {
      return true;
    }

    return false;
  }
}
