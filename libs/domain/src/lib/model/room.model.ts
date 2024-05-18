import { RoomStatusEnum } from '../enum';
import { BaseModel } from './base.model';
import { GameModel } from './game.model';
import { UserModel } from './user.model';

export interface RoomModel extends BaseModel {
  users: UserModel[];
  status: RoomStatusEnum;
  game: GameModel;
}
