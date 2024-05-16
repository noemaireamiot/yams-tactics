import { TokenTypeEnum } from '../../../enum';

export const tokenDefinitions: Record<
  TokenTypeEnum,
  {
    name: string;
  }
> = {
  [TokenTypeEnum.minus_one]: { name: '-1' },
  [TokenTypeEnum.plus_one]: { name: '+1' },
};
