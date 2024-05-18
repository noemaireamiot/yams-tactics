import { RoomModel } from '@yams-tactics/domain';
import { BaseEntity } from './base';
import { User } from './user';

export class Room extends BaseEntity implements RoomModel {
  users: User[];

  constructor(props?: Partial<RoomModel>) {
    super(props);
    this.users = props?.users ?? [];
  }
}
