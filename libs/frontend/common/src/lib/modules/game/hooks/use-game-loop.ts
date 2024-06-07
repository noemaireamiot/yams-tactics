import { Dispatch, useEffect } from 'react';
import { GameContextAction, GameContextState } from '../contexts/types';
import { useGetCurrentPlayer } from './use-get-current-player';
import { GAME_RATE, gameLoop } from '@yams-tactics/domain';

/**
 * Handle game main loop
 */
export function useGameLoop(
  state: GameContextState,
  dispatch: Dispatch<GameContextAction>
) {
  const getCurrentPlayer = useGetCurrentPlayer();
  useEffect(() => {
    let clearInterval: CallableFunction | null = null;
    if (!state.isLoading) {
      ({ clearInterval } = gameLoop(state.game, {
        gameRate: GAME_RATE / 3,
        gameUpdateFn: (game) => {
          dispatch({
            type: 'game_loop',
            game,
            currentPlayer: getCurrentPlayer(state.game.players),
          });
        },
      }));
    }

    return () => {
      if (clearInterval) clearInterval();
    };
  }, [state.isLoading, state.game, getCurrentPlayer, dispatch]);
}
