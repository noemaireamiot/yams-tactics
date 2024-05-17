import { DiceModel, DiceTypeEnum } from '@yams-tactics/domain';
import { BaseEntity } from './base';

export class Dice extends BaseEntity implements DiceModel {
  currentFace: DiceModel['currentFace'];
  faces: DiceModel['faces'];
  type: DiceModel['type'];

  constructor(props?: Partial<DiceModel>) {
    super(props);
    this.currentFace = props?.currentFace ?? null;
    this.faces = props?.faces ?? [];
    this.type = props?.type ?? DiceTypeEnum.black;
  }
}
