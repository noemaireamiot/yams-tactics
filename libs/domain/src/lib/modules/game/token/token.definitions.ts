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
      void round, dice;
      return player;
    },
  },
  [TokenTypeEnum.hermit]: {
    name: 'Hermit',
    description: 'Double la thune',
    effect: ({ player }) => {
      player.gold = player.gold * 2;
      return { ...player, gold: player.gold * 2 };
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
      dice?: DiceModel;
    }) => PlayerModel;
  }
>;
