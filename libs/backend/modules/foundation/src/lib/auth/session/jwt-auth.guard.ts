import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserModel } from '@yams-tactics/domain';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  public override getRequest(context: ExecutionContext) {
    if (context.getType() === 'http') {
      return context.switchToHttp().getRequest();
    }

    return null;
  }

  public override handleRequest<U extends UserModel>(err: Error, user: U) {
    // throw a nestjs error instead of Passport error
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    // @NOTE user can be User or Contact, so far we have guards that will check if user has access before executing actions
    // If we find that put Contact in the context can be use as a breach, we will have to refactor this to handle when it's a Contact or User
    // We recommand, we use authenticated-contact.guard or authenticated-user.guard which will verify the type and use the correct object from ContextService
    return user;
  }
}
