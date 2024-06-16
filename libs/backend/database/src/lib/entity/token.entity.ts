import { TokenModel, TokenTypeEnum } from '@yams-tactics/domain';
import { BaseEntity } from './base.entity';

export class Token extends BaseEntity implements TokenModel {
  declare type: TokenTypeEnum;

  constructor(props?: Partial<TokenModel>) {
    super(props);
    Object.assign(this, props);
  }
}
