import { TokenTypeEnum } from '../enum';
import { BaseModel } from './base.model';

export interface TokenModel extends BaseModel {
  type: TokenTypeEnum;
}
