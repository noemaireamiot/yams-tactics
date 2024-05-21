import { GameModel, PlayerModel, Round } from '@yams-tactics/domain';
import { BaseEntity } from './base.entity';

export class Game extends BaseEntity implements GameModel {
  players: PlayerModel[] = [];
  currentRound: Round = `shop.1`;
  startedAt: Date = new Date();

  constructor(props?: Partial<GameModel>) {
    super(props);
    Object.assign(this, props);
  }
}
