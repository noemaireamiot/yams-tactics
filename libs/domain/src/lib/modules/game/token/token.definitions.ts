import { TokenTypeEnum } from '../../../enum';
import { DiceModel, PlayerModel, Round } from '../../../model';

export const tokenDefinitions = {
  [TokenTypeEnum.plus_one]: {
    name: '+1',
    description: 'Add one to a dice',
    effect: ({ player }) => {
      return player;
    },
  },
  [TokenTypeEnum.minus_one]: {
    name: '+1',
    description: 'Substract one to a dice',
    effect: ({ player, round, dice }) => {
      return player;
    },
  },
} as const satisfies Record<
  TokenTypeEnum,
  {
    name: string;
    description: string;
    effect: (params: {
      player: PlayerModel;
      round: Round;
      dice: DiceModel;
    }) => PlayerModel;
  }
>;
