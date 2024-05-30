import { BaseModel } from './base.model';

export interface AuthTokenModel {
  accessToken: string;
  refreshToken: string;
}

export interface UserModel extends BaseModel {
  name: string;
  avatar: string;
}
