import { UserModel } from '@yams-tactics/domain';
import { BaseEntity } from './base.entity';

// @TODO - Use a typeorm repository
export class User extends BaseEntity implements UserModel {
  name: string = 'default name';

  avatar: string | null = null;

  constructor(props?: Partial<UserModel>) {
    super(props);
    Object.assign(this, props);
  }
}
