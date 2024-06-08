import { ActionTypeEnum, PlayerModel } from '@yams-tactics/domain';
import { GameContextAction, GameContextState } from './types';

export function gameReducer(
  state: GameContextState,
  action: GameContextAction
): GameContextState {
  switch (action.type) {
    case 'reconciliate': {
      return {
        ...state,
        isLoading: false,
        game: { ...(state.game ?? action.game) },
        currentPlayer: {
          ...action.currentPlayer,
          actions: [
            ...(action?.currentPlayer?.actions ?? []),
            ...(state?.currentPlayer?.actions ?? []).slice(
              (action?.currentPlayer?.actions ?? []).length
            ),
          ],
          dices:
            state?.currentPlayer?.dices ?? action?.currentPlayer?.dices ?? [],
        },
      };
    }

    case 'game_loop': {
      return state.isLoading
        ? state
        : {
            ...state,
            game: action.game,
            currentPlayer: action.currentPlayer,
          };
    }

    case ActionTypeEnum.roll_dices: {
      return state.isLoading
        ? state
        : {
            ...state,
            game: {
              ...state.game,
              players: state.game.players.map((p) =>
                p.id === action.currentPlayer.id ? action.currentPlayer : p
              ),
            },
            currentPlayer: action.currentPlayer,
          };
    }

    case ActionTypeEnum.submit_score: {
      if (state.isLoading) {
        return state;
      }

      const currentPlayer = {
        ...action.currentPlayer,
        scoreboard: {
          ...action.currentPlayer.scoreboard,
          scores: [
            ...action.currentPlayer.scoreboard.scores.map((score) => {
              return score.id === action.score.id
                ? {
                    ...score,
                    done: true,
                    value: score.value,
                  }
                : score;
            }),
          ],
        },
      } as PlayerModel;

      return {
        ...state,
        game: {
          ...state.game,
          players: state.game.players.map((p) =>
            p.id === currentPlayer.id ? currentPlayer : p
          ),
        },
        currentPlayer,
      };
    }

    default:
      throw Error('Unknown action: ' + action['type']);
  }
}
