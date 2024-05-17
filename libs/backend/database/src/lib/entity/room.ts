import { RoomModel, UserModel } from '@yams-tactics/domain';
import { BaseEntity } from './base';

export class Room extends BaseEntity implements RoomModel {
  users: UserModel[];

  constructor(props?: Partial<RoomModel>) {
    super(props);
    this.users = props?.users ?? [];
  }
}
