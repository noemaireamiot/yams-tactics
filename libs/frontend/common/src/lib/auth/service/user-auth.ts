import { UserModel } from '@yams-tactics/domain';
import { AuthToken } from '../token';
import { UserAuthToken } from '../types';
import { BaseAuthService } from './base-auth';
import { Router } from '../../router';

export class UserAuthService extends BaseAuthService {
  constructor(private readonly baseAPI: string) {
    super(
      new AuthToken({
        refreshUrl: `${baseAPI}/auth/session/refresh`,
        syncLogoutKey: 'auth_sync_logout',
      })
    );
  }

  public async passwordLogin(name: string): Promise<UserAuthToken> {
    const response = await fetch(`${this.baseAPI}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        name,
      }),
    });
    if (!response.ok) {
      throw response;
    }
    const userToken: UserAuthToken = await response.json();

    if (userToken.accessToken) {
      this.authToken.setAuthToken(userToken);
    }

    return userToken;
  }

  public async register(name: string): Promise<UserModel> {
    const response = await fetch(`${this.baseAPI}/user/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      credentials: 'include',
      body: JSON.stringify({
        name,
      }),
    });
    if (!response.ok) {
      throw response;
    }

    const userToken: UserModel = await response.json();

    return userToken; //we only get here if there is no error
  }

  public async logout(): Promise<string> {
    const accessToken = this.authToken.getAccessToken();
    this.authToken.clearAuthToken();
    if (accessToken) {
      const request = new Request(`${this.baseAPI}/auth/session/logout`, {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        }),
        credentials: 'include',
      });
      await fetch(request);
    }

    return Router.Login();
  }
}
