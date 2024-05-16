import { ScoreTypeEnum } from '../enum';
import { BaseModel } from './base';

export interface ScoreModel extends BaseModel {
  type: ScoreTypeEnum;
  value: number;
  done: boolean;
}
