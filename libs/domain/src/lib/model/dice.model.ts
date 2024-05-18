import { DiceTypeEnum } from '../enum';
import { BaseModel } from './base.model';

interface FaceModel extends BaseModel {
  value: number;
}

export interface DiceModel extends BaseModel {
  faces: FaceModel[];
  currentFace: FaceModel | null;
  type: DiceTypeEnum;
}