import { Dice } from './dice';
import { Room } from './room';
import { User } from './user';

export const entities = [Room, Dice, User];
export type Entity = InstanceType<(typeof entities)[number]>;
export { Room, Dice, User };
