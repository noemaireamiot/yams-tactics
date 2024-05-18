import { Dice } from './dice.entity';
import { Room } from './room.entity';
import { User } from './user.entity';
import { Game } from './game.entity';

export const entities = [Room, Dice, User, Game];
export type Entity = InstanceType<(typeof entities)[number]>;

export { Room, Dice, User, Game as Game };
