import { UserDto } from '@yams-tactics/backend-dto';

export interface LoginInput {
  name: string;
}

export interface LoginResponse extends UserDto {
  token: string;
}

export interface RefreshResponse {
  token: string;
}

export interface RegisterInput {
  name: string;
}

export interface RegisterResponse {
  token: string;
}
