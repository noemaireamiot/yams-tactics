import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ACCESS_TOKEN_EXPIRATION_SECONDS } from '@yams-tactics/domain';
import { ConfigService } from '@nestjs/config';
import { RefreshTokenService } from '../refresh-token';
import { UserAuthToken } from './user-auth-token';
import { User } from '@yams-tactics/backend-database';

// for now
export type UserTokenPayload = {
  sub: string;
  // email: string
};
@Injectable()
export class AuthTokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly refreshTokenService: RefreshTokenService,
    private readonly configService: ConfigService
  ) {}

  /**
   * Forged & get a new JWT from a User (attach a refreshToken to it)
   * @param user
   */
  public generateUserAuthToken(user: User): UserAuthToken {
    const payload: UserTokenPayload = {
      sub: user.id,
      // email: user.email,
    };
    const token = this.jwtService.sign(payload);

    const newRefreshToken = this.refreshTokenService.createOne({
      userId: user.id,
    });

    return {
      userId: user.id,
      accessToken: token,
      refreshToken: newRefreshToken.refreshToken,
      expiresAt: new Date(Date.now() + ACCESS_TOKEN_EXPIRATION_SECONDS * 1000),
      refreshExpiresAt: newRefreshToken.expiresAt,
    };
  }

  public getJwtSecret(): string {
    return this.configService.get('JWT_SECRET') ?? 'secret';
  }
}
