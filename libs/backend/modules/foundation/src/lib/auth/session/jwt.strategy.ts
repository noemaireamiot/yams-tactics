import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthTokenService } from '../auth-token';
import { JWT_COOKIE_NAME } from './constants';
import { Request } from 'express';
import {
  InjectRepository,
  Repository,
  User,
} from '@yams-tactics/backend-database';

const cookieExtractor = function (req: Request) {
  let token = null;
  if (req && req.signedCookies && req.signedCookies[JWT_COOKIE_NAME]) {
    token = req.signedCookies[JWT_COOKIE_NAME];
  }
  return token;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    authTokenService: AuthTokenService,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        cookieExtractor,
      ]),
      ignoreExpiration: false,
      secretOrKey: authTokenService.getJwtSecret(),
    });
  }

  public async validate(payload: { sub?: string }): Promise<User | null> {
    if (payload.sub) {
      const user = await this.userRepo.findOne(payload.sub);
      if (!user) {
        throw new UnauthorizedException();
      }

      return user;
    }

    return null;
  }
}
