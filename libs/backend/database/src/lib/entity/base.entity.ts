import { BaseModel } from '@yams-tactics/domain';
import { v4 } from 'uuid';

export class BaseEntity implements BaseModel {
  id = v4();

  constructor(props?: Partial<BaseModel>) {
    Object.assign(this, props);
  }
}
