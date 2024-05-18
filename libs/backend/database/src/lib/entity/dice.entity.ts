import { DiceModel, DiceTypeEnum } from '@yams-tactics/domain';
import { BaseEntity } from './base.entity';

export class Dice extends BaseEntity implements DiceModel {
  public currentFace: DiceModel['currentFace'] = null;
  faces: DiceModel['faces'] = [];
  type: DiceModel['type'] = DiceTypeEnum.black;
}
