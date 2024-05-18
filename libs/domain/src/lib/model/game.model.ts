import { BaseModel } from './base.model';
import { PlayerModel } from './player.model';

export type Phase = 'shop' | 'dice';
export type Round = `${Phase}.${number}`;

export interface GameModel extends BaseModel {
  players: PlayerModel[];
  currentRound: Round;
  startedAt: Date;
}
