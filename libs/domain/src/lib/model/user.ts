import { BaseModel } from './base';
import { DiceModel } from './dice';
import { PassiveModel } from './passive';
import { TokenModel } from './token';

export interface UserModel extends BaseModel {
  dices: DiceModel[];
  tokens: TokenModel[];
  passives: PassiveModel[];
}
