import {
  ActionTypeEnum,
  DiceModel,
  Round,
  ScoreModel,
  actionDefinition,
  onSubmitScore,
} from '@yams-tactics/domain';
import { Dispatch, useCallback } from 'react';
import { usePlayerActions } from '../../../query';
import { GameContextAction, GameContextState } from '../contexts/types';
import { useGetCurrentPlayer } from './use-get-current-player';

export function useSubmitScore(
  state: GameContextState,
  dispatch: Dispatch<GameContextAction>
) {
  const { mutateAsync: playerActions } = usePlayerActions();
  const getCurrentPlayer = useGetCurrentPlayer();

  return useCallback(
    async ({
      dices,
      round,
      score,
    }: {
      dices: DiceModel[];
      round: Round;
      score: ScoreModel;
    }) => {
      const action = actionDefinition.submit_score({ dices, round, score });
      await playerActions(action);

      onSubmitScore(
        { player: getCurrentPlayer(state.game?.players), dices, round },
        (player) => {
          dispatch({ type: ActionTypeEnum.roll_dices, currentPlayer: player });
        }
      );
    },
    [playerActions, getCurrentPlayer, state.game?.players, dispatch]
  );
}
