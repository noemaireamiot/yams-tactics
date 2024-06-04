import { ActionTypeEnum } from '../enum';
import { BaseModel } from './base.model';
import { DiceModel } from './dice.model';
import { PassiveModel } from './passive.model';
import { ScoreboardModel } from './scoreboard.model';
import { TokenModel } from './token.model';
import { UserModel } from './user.model';

export type Action = { type: ActionTypeEnum.roll_dices; dices: number[] };

export interface PlayerModel extends BaseModel {
  user: UserModel;
  actions: Action[];

  seed: string;
  gold: number;
  scoreboard: ScoreboardModel;

  dices: DiceModel[];
  tokens: TokenModel[];
  passives: PassiveModel[];
}
