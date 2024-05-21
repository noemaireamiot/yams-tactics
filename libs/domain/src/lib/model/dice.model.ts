import { DiceTypeEnum } from '../enum';
import { BaseModel } from './base.model';
import { FaceModel } from './face.model';

export interface DiceModel extends BaseModel {
  faces: FaceModel[];
  currentFace: FaceModel | null;
  type: DiceTypeEnum;
}
