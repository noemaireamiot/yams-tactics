import { ActionTypeEnum } from '../../../enum';

export const actionDefinition = {
  [ActionTypeEnum.roll_dices]: (dices: number[]) => ({
    type: ActionTypeEnum.roll_dices,
    dices,
  }),
} as const;
