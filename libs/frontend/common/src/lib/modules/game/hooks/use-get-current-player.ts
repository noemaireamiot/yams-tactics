import { useCallback } from 'react';
import { useAuth } from '../../../auth';
import { PlayerModel } from '@yams-tactics/domain';

export function useGetCurrentPlayer() {
  const {
    auth: { userId },
  } = useAuth();
  return useCallback(
    (players?: PlayerModel[]) => {
      return (players ?? []).find(
        (player) => player.user.id === userId
      ) as PlayerModel;
    },
    [userId]
  );
}
