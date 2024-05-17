import { Dice } from './dice';
import { Room } from './room';

export const entities = [Room, Dice];
export type Entity = InstanceType<(typeof entities)[number]>;
export { Room, Dice };
