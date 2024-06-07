import {
  ActionTypeEnum,
  Round,
  actionDefinition,
  onRollDices,
} from '@yams-tactics/domain';
import { Dispatch, useCallback } from 'react';
import { usePlayerActions } from '../../../query';
import { GameContextAction, GameContextState } from '../contexts/types';
import { useGetCurrentPlayer } from './use-get-current-player';

//
export function useRollDices(
  state: GameContextState,
  dispatch: Dispatch<GameContextAction>
) {
  const { mutateAsync: playerActions } = usePlayerActions();
  const getCurrentPlayer = useGetCurrentPlayer();

  return useCallback(
    async (dices: number[], round: Round) => {
      const action = actionDefinition.roll_dices(dices, round);
      await playerActions(action);

      onRollDices(
        { player: getCurrentPlayer(state.game?.players), dices, round },
        (player) => {
          dispatch({ type: ActionTypeEnum.roll_dices, currentPlayer: player });
        }
      );
    },
    [playerActions, getCurrentPlayer, state.game?.players, dispatch]
  );
}
