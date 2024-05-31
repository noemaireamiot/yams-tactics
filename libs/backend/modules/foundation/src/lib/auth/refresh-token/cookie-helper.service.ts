import { Response, Request, CookieOptions } from 'express';
import { Injectable } from '@nestjs/common';
import { UserAuthToken } from '../auth-token';

@Injectable()
export class CookieHelperService {
  private readonly COOKIE_NAME = 'auth_refresh';
  private readonly REFRESH_PATH = '/auth/session/refresh';

  constructor() {}

  public getRefreshCookie(req: Request) {
    return req.signedCookies[this.COOKIE_NAME];
  }

  public setRefreshCookie(res: Response, token: UserAuthToken) {
    res.cookie(this.COOKIE_NAME, token.refreshToken, {
      ...this.getCommonCookieOptions(),
      signed: true,
      expires: token.refreshExpiresAt,
    });
  }

  public clearRefreshCookie(res: Response) {
    res.clearCookie(this.COOKIE_NAME, {
      ...this.getCommonCookieOptions(),
      signed: false,
      expires: new Date(0),
    });
  }

  private getCommonCookieOptions(): CookieOptions {
    // @TODO - Clear for https
    return {
      httpOnly: true,
      secure: false,
      path: '/',
      sameSite: 'strict',
    };
  }
}
