import { PassiveTypeEnum } from '../enum';
import { BaseModel } from './base.model';

export interface PassiveModel extends BaseModel {
  type: PassiveTypeEnum;
}
