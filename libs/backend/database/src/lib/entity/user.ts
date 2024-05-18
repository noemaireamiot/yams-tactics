import {
  DiceModel,
  PassiveModel,
  TokenModel,
  UserModel,
} from '@yams-tactics/domain';
import { BaseEntity } from './base';

export class User extends BaseEntity implements UserModel {
  name: string;

  dices: DiceModel[];
  tokens: TokenModel[];
  passives: PassiveModel[];

  constructor(props?: Partial<UserModel>) {
    super(props);
    this.name = props?.name ?? '';
    this.dices = props?.dices ?? [];
    this.tokens = props?.tokens ?? [];
    this.passives = props?.passives ?? [];
  }
}
