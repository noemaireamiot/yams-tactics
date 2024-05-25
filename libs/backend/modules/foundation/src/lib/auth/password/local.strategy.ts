import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import {
  HttpStatus,
  Injectable,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthPasswordService } from './auth-password.service';
import { Request } from 'express';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authPasswordService: AuthPasswordService) {
    super({
      usernameField: 'name',
    });
  }

  public override authenticate(@Req() req: Request) {
    const user = this.authPasswordService.validateUser(req.body.name);
    if (!user) {
      this.fail(new UnauthorizedException(), HttpStatus.UNAUTHORIZED);
    }

    this.success(user);
  }
}
