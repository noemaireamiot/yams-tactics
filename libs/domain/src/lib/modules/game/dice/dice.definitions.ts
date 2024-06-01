import { DiceTypeEnum } from '../../../enum';

export const diceDefinitions: Record<
  DiceTypeEnum,
  {
    name: string;
  }
> = {
  [DiceTypeEnum.black]: { name: 'black' },
  [DiceTypeEnum.white]: { name: 'white' },
  [DiceTypeEnum.red]: { name: 'red' },
  [DiceTypeEnum.gold]: { name: 'gold' },
};
