import { ActionTypeEnum } from '../../../enum';
import { DiceModel, ScoreModel } from '../../../model';
import { Round } from '../../../model/game.model';

export const actionDefinition = {
  [ActionTypeEnum.roll_dices]: ({
    dices,
    round,
  }: {
    dices: DiceModel[];
    round: Round;
  }) => ({
    type: ActionTypeEnum.roll_dices,
    round,
    dices,
  }),
  [ActionTypeEnum.submit_score]: ({
    dices,
    round,
    score,
  }: {
    dices: DiceModel[];
    round: Round;
    score: ScoreModel;
  }) => ({
    type: ActionTypeEnum.submit_score,
    round,
    dices,
    score,
  }),
} as const;

export type Action = ReturnType<
  (typeof actionDefinition)[keyof typeof actionDefinition]
>;
