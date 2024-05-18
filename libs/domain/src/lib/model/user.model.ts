import { BaseModel } from './base.model';
import { DiceModel } from './dice.model';
import { PassiveModel } from './passive.model';
import { TokenModel } from './token.model';

export interface UserModel extends BaseModel {
  name: string;

  dices: DiceModel[];
  tokens: TokenModel[];
  passives: PassiveModel[];
}
