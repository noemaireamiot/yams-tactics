import { Dice } from './dice.entity';
import { Room } from './room.entity';
import { User } from './user.entity';
import { Game } from './game.entity';
import { Player } from './player.entity';
import { Face } from './face.entity';
import { Scoreboard } from './scoreboard.entity';
import { RefreshToken } from './refresh-token.entity';
import { Token } from './token.entity';

export const entities = [
  Room,
  Dice,
  Face,
  User,
  Game,
  Player,
  RefreshToken,
  Scoreboard,
  Token,
];
export type Entity = InstanceType<(typeof entities)[number]>;

export {
  Room,
  Dice,
  Face,
  User,
  Game,
  Player,
  RefreshToken,
  Scoreboard,
  Token,
};
