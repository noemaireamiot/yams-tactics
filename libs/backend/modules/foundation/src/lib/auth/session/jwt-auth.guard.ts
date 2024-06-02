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

    return user;
  }
}
