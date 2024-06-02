import {
  DiceModel,
  PassiveModel,
  TokenModel,
  PlayerModel,
  ScoreboardModel,
  ActionTypeEnum,
} from '@yams-tactics/domain';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { Scoreboard } from './scoreboard.entity';

export class Player extends BaseEntity implements PlayerModel {
  user: User = new User();
  actions: { type: ActionTypeEnum }[] = [];

  gold: number = 0;
  seed: string = 'seed';
  scoreboard: ScoreboardModel = new Scoreboard();

  dices: DiceModel[] = [];
  tokens: TokenModel[] = [];
  passives: PassiveModel[] = [];

  constructor(props?: Partial<PlayerModel>) {
    super(props);
    Object.assign(this, props);
  }
}
