import { BehaviorSubject } from 'rxjs';
import { BaseAuthToken } from './types';

interface authTokenOptions {
  refreshUrl: string;
  syncLogoutKey?: string;
}

const DEFAULT_SYNC_LOGOUT_KEY = 'auth_sync_logout';

export class AuthToken<T extends BaseAuthToken> {
  private inMemoryAuthToken: T | null = null;
  private auth$ = new BehaviorSubject<boolean>(false);
  private syncLogoutKey = DEFAULT_SYNC_LOGOUT_KEY;

  constructor(private readonly options: authTokenOptions) {
    if (options.syncLogoutKey) {
      this.syncLogoutKey = options.syncLogoutKey;
    }

    // This listener allows to disconnect another session started in another tab
    window.addEventListener('storage', (event) => {
      if (event.key === this.syncLogoutKey) {
        this.inMemoryAuthToken = null;
      }
    });
  }

  public authState(): boolean {
    return this.auth$.value;
  }

  public getAuthToken(): T | null {
    return this.inMemoryAuthToken;
  }

  public getAccessToken(): string | null {
    return this.inMemoryAuthToken?.accessToken || null;
  }

  public setAuthToken(userToken: T): boolean {
    this.inMemoryAuthToken = userToken;
    this.auth$.next(true);
    return true;
  }

  public clearAuthToken(): boolean {
    this.inMemoryAuthToken = null;
    this.auth$.next(false);
    window.localStorage.setItem(this.syncLogoutKey, Date.now().toString());
    return true;
  }

  public async refreshAccessToken(): Promise<T> {
    const request = new Request(this.options.refreshUrl, {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'include', // should include the refreshToken cookie
    });
    const response = await fetch(request);
    if (!response.ok) {
      // this.clearAuthToken();

      console.warn('🔐 Failed to renew the jwt from the refresh token.');
      throw response;
    }
    const authToken: T = await response.json();

    this.setAuthToken(authToken);
    return authToken;
  }
}
