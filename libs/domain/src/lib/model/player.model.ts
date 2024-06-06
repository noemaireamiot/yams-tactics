import { ActionTypeEnum } from '../enum';
import { BaseModel } from './base.model';
import { DiceModel } from './dice.model';
import { Round } from './game.model';
import { PassiveModel } from './passive.model';
import { ScoreboardModel } from './scoreboard.model';
import { TokenModel } from './token.model';
import { UserModel } from './user.model';

type ActionPayload<T extends ActionTypeEnum, P = object> = P & {
  type: T;
  round: Round;
};
export type Action = ActionPayload<
  ActionTypeEnum.roll_dices,
  {
    dices: number[];
  }
>;

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
