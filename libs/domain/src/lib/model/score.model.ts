import { ScoreTypeEnum } from '../enum';
import { BaseModel } from './base.model';

export interface ScoreModel extends BaseModel {
  type: ScoreTypeEnum;
  value: number | null;
  done: boolean;
}
