import { Injectable } from '@nestjs/common';
import {
  InjectRepository,
  Repository,
  User,
} from '@yams-tactics/backend-database';
import {
  RefreshTokenService,
  InvalidRefreshTokenException,
} from '../refresh-token';
import { AuthTokenService, UserAuthToken } from '../auth-token';

@Injectable()
export class AuthSessionService {
  constructor(
    private readonly refreshTokenService: RefreshTokenService,
    private readonly authTokenService: AuthTokenService,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ) {}

  /**
   * Refresh user JWT from refreshToken
   * @param refreshToken
   */
  public async refreshTokenUser(refreshToken: string): Promise<UserAuthToken> {
    if (!refreshToken) {
      console.log('Invalid session refresh: No refresh token cookie');
      throw new InvalidRefreshTokenException();
    }

    const currentRefreshToken = await this.refreshTokenService.findOneBy(
      'refreshToken',
      refreshToken
    );

    if (!currentRefreshToken) {
      console.log(
        'Invalid session refresh: No refresh token exists in database'
      );
      throw new InvalidRefreshTokenException();
    }

    const user = this.userRepo.findOne(currentRefreshToken.userId);

    if (!user) {
      console.log('Invalid session refresh: Refresh token without user');
      throw new InvalidRefreshTokenException();
    }

    // clean expired RefreshTokens
    await this.cleanExpiredRefreshToken(user);
    // If current is expired, still throw an error
    // if (!this.tokenService.checkExpiresAt(currentRefreshToken.expiresAt)) {
    //   console.log('Invalid session refresh: Refresh token has expired');
    //   throw new InvalidRefreshTokenException();
    // }

    // Generate new UserAuthToken with RefreshToken
    // this.logger.log(
    //   `Creating a new refresh token for user ${user.id}`
    // );
    const newAuthToken = await this.authTokenService.generateUserAuthToken(
      user
    );

    return newAuthToken;
  }

  /**
   * Logout user and clean expired refreshTokens
   * @param user
   */
  public async logoutUser(user: User) {
    await this.cleanExpiredRefreshToken(user);
  }

  private async cleanExpiredRefreshToken(user: User) {
    // clean expired RefreshTokens
    const expiredRefreshTokens = await this.refreshTokenService.findAll(
      ({ userId, expiresAt }) => userId === user.id && expiresAt <= new Date()
    );

    // Delete expired refreshToken
    for (const token of expiredRefreshTokens) {
      await this.refreshTokenService.delete(token.id);
    }
  }
}
