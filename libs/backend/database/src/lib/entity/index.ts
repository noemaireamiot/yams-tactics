import { Dice } from './dice.entity';
import { Room } from './room.entity';
import { User } from './user.entity';
import { Game } from './game.entity';
import { Player } from './player.entity';

export const entities = [Room, Dice, User, Game, Player];
export type Entity = InstanceType<(typeof entities)[number]>;

export { Room, Dice, User, Game, Player };
