import { BaseModel } from './base.model';
import { UserModel } from './user.model';

export interface RoomModel extends BaseModel {
  users: UserModel[];
}
