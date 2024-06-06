import {
  GAME_RATE,
  GameModel,
  PlayerModel,
  gameLoop,
} from '@yams-tactics/domain';
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import { useGame } from '../../../query';
import { useAuth } from '../../../auth';

type GameContextState =
  | {
      isLoading: false;
      game: GameModel;
      currentPlayer: PlayerModel;
    }
  | { isLoading: true; currentPlayer?: never; game?: never };

const GameContext = createContext<GameContextState>({ isLoading: true });

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
    };

function reducer(
  state: GameContextState,
  action: GameContextAction
): GameContextState {
  switch (action.type) {
    case 'reconciliate': {
      return {
        ...state,
        isLoading: false,
        game: action.game,
        currentPlayer: action.currentPlayer,
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

    default:
      throw Error('Unknown action: ' + action['type']);
  }
}

export const GameContextProvider = ({
  children,
  gameId,
}: PropsWithChildren<{ gameId: string }>) => {
  const { data } = useGame(gameId);
  const [state, dispatch] = useReducer(reducer, { isLoading: true });
  const {
    auth: { userId },
  } = useAuth();

  useEffect(() => {
    if (data) {
      const currentPlayer = (data?.players ?? []).find(
        (player) => player.user.id === userId
      ) as PlayerModel;

      dispatch({
        type: 'reconciliate',
        game: data,
        currentPlayer,
      });
    }
  }, [data, userId]);

  useEffect(() => {
    let clearInterval: CallableFunction | null = null;
    if (!state.isLoading) {
      ({ clearInterval } = gameLoop(state.game, {
        gameRate: GAME_RATE / 3,
        gameUpdateFn: (game) => {
          const currentPlayer = (data?.players ?? []).find(
            (player) => player.user.id === userId
          ) as PlayerModel;

          dispatch({
            type: 'game_loop',
            game,
            currentPlayer,
          });
        },
      }));
    }

    return () => {
      if (clearInterval) clearInterval();
    };
  }, [state.isLoading, state.game]);

  return <GameContext.Provider value={state}>{children}</GameContext.Provider>;
};

export const useGameContext = () => {
  return useContext(GameContext);
};
