import { BaseModel } from '@yams-tactics/domain';
import { v4 } from 'uuid';

export class BaseEntity implements BaseModel {
  id: string;

  constructor(props?: Partial<BaseModel>) {
    this.id = props?.id ?? v4();
  }
}
