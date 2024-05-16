import { PassiveTypeEnum } from '../enum';
import { BaseModel } from './base';

export interface PassiveModel extends BaseModel {
  type: PassiveTypeEnum;
}
