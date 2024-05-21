import { FaceModel } from '@yams-tactics/domain';
import { BaseEntity } from './base.entity';

export class Face extends BaseEntity implements FaceModel {
  value: FaceModel['value'] = 1;

  constructor(props?: Partial<FaceModel>) {
    super(props);
    Object.assign(this, props);
  }
}
