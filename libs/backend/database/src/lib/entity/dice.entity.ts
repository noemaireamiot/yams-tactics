import { DiceModel, DiceTypeEnum } from '@yams-tactics/domain';
import { BaseEntity } from './base.entity';
import { Face } from './face.entity';

export class Dice extends BaseEntity implements DiceModel {
  currentFace: DiceModel['currentFace'] = null;
  faces: DiceModel['faces'] = new Array(6)
    .fill(0)
    .map((e, i) => new Face({ value: i + 1 }));
  type: DiceModel['type'] = DiceTypeEnum.black;

  constructor(props?: Partial<DiceModel>) {
    super(props);
    Object.assign(this, props);
  }
}
