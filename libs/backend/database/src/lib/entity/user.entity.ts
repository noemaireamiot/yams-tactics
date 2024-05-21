import { UserModel } from '@yams-tactics/domain';
import { BaseEntity } from './base.entity';

export class User extends BaseEntity implements UserModel {
  name: string = 'default name';

  constructor(props?: Partial<UserModel>) {
    super(props);
    Object.assign(this, props);
  }
}
