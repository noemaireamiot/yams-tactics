import { BaseModel } from './base';
import { UserModel } from './user';

export interface RoomModel extends BaseModel {
  users: UserModel;
}
