import { ActionTypeEnum } from '../../../enum';
import { Round } from '../../../model/game.model';

export const actionDefinition = {
  [ActionTypeEnum.roll_dices]: (dices: number[], round: Round) => ({
    type: ActionTypeEnum.roll_dices,
    round,
    dices,
  }),
} as const;
