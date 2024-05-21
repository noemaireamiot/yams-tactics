import { RoomModel, RoomStatusEnum } from '@yams-tactics/domain';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { Game } from './game.entity';

export class Room extends BaseEntity implements RoomModel {
  users: User[] = [];
  status: RoomStatusEnum = RoomStatusEnum.pending;
  game: Game | null = null;

  constructor(props?: Partial<RoomModel>) {
    super(props);
    Object.assign(this, props);
  }
}
