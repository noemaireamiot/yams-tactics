import { Dispatch, useEffect } from 'react';
import { useGame } from '../../../query';
import { GameContextAction } from '../contexts/types';
import { useGetCurrentPlayer } from './use-get-current-player';

/**
 * Handle reconciliation between server state and local one
 */
export function useReconciliate(
  gameId: string,
  dispatch: Dispatch<GameContextAction>
) {
  const getCurrentPlayer = useGetCurrentPlayer();
  const { data } = useGame(gameId);

  useEffect(() => {
    if (data) {
      dispatch({
        type: 'reconciliate',
        game: data,
        currentPlayer: getCurrentPlayer(data.players),
      });
    }
  }, [data, getCurrentPlayer, dispatch]);
}
