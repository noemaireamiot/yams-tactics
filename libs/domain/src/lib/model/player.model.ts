import { BaseModel } from './base.model';
import { DiceModel } from './dice.model';
import { PassiveModel } from './passive.model';
import { ScoreboardModel } from './scoreboard.model';
import { TokenModel } from './token.model';
import { UserModel } from './user.model';

export interface PlayerModel extends BaseModel {
  user: UserModel;

  seed: string;
  gold: number;
  scoreboard: ScoreboardModel;

  dices: DiceModel[];
  tokens: TokenModel[];
  passives: PassiveModel[];
}
