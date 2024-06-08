import {
  ActionTypeEnum,
  DiceModel,
  GameModel,
  PlayerModel,
  Round,
  ScoreModel,
} from '@yams-tactics/domain';

export type GameContextState =
  | {
      isLoading: false;
      game: GameModel;
      currentPlayer: PlayerModel;
      onRollDices: (param: {
        dices: DiceModel[];
        round: Round;
      }) => Promise<void>;
      onSubmitScore: (param: {
        dices: DiceModel[];
        round: Round;
        score: ScoreModel;
      }) => Promise<void>;
    }
  | {
      isLoading: true;
      currentPlayer?: never;
      game?: never;
      onRollDices: (param: {
        dices: DiceModel[];
        round: Round;
      }) => Promise<void>;
      onSubmitScore: (param: {
        dices: DiceModel[];
        round: Round;
        score: ScoreModel;
      }) => Promise<void>;
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
    }
  | {
      type: ActionTypeEnum.submit_score;
      currentPlayer: PlayerModel;
      score: ScoreModel;
    };
