export interface Auth {
  isAuthenticated: boolean | null;
  logout: boolean;
  userId?: null | string;
}

export interface BaseAuthToken {
  accessToken: string;
  expiresAt: string;
  refreshToken?: string;
  refreshExpiresAt?: string;
}

export interface UserAuthToken extends BaseAuthToken {
  userId: string;
}
