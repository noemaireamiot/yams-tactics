import { AuthToken } from '../token';
import { BaseAuthToken } from '../types';

export abstract class BaseAuthService {
  protected readonly authToken: AuthToken<BaseAuthToken>;

  constructor(authToken: AuthToken<BaseAuthToken>) {
    this.authToken = authToken;
  }

  public checkAuth(): boolean {
    return this.authToken.getAccessToken() === null ? false : true;
  }

  public async silentRefresh(): Promise<BaseAuthToken> {
    const token: BaseAuthToken = await this.authToken.refreshAccessToken();
    return token;
  }

  public getToken(): AuthToken<BaseAuthToken> {
    return this.authToken;
  }
}
