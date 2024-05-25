export class UserAuthToken {
  declare accessToken: string;
  refreshToken?: string;
  declare userId: string;
  declare expiresAt: Date;
  refreshExpiresAt?: Date;
  notificationToken?: string;
}
