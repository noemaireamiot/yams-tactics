import { TokenTypeEnum } from '../enum';
import { BaseModel } from './base';

export interface TokenModel extends BaseModel {
  type: TokenTypeEnum;
}
