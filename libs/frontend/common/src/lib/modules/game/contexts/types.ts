import {
  ActionTypeEnum,
  GameModel,
  PlayerModel,
  Round,
} from '@yams-tactics/domain';

export type GameContextState =
  | {
      isLoading: false;
      game: GameModel;
      currentPlayer: PlayerModel;
      onRollDices: (dices: number[], round: Round) => Promise<void>;
    }
  | {
      isLoading: true;
      currentPlayer?: never;
      game?: never;
      onRollDices: (dices: number[], round: Round) => Promise<void>;
    };

export type GameContextAction =
  | {
      type: 'reconciliate';
      game: GameModel;
      currentPlayer: PlayerModel;
    }
  | {
      type: 'game_loop';
      game: GameModel;
      currentPlayer: PlayerModel;
    }
  | {
      type: ActionTypeEnum.roll_dices;
      currentPlayer: PlayerModel;
    };
