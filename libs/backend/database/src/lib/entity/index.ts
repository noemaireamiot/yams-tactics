import { Dice } from './dice.entity';
import { Room } from './room.entity';
import { User } from './user.entity';
import { Game } from './game.entity';
import { Player } from './player.entity';
import { Face } from './face.entity';

export const entities = [Room, Dice, Face, User, Game, Player];
export type Entity = InstanceType<(typeof entities)[number]>;

export { Room, Dice, Face, User, Game, Player };
