import { GameLayout } from './layouts/game-layout';
import { useAuth, useGame } from '@yams-tactics/frontend-common';
import { DiceZone } from './dice';

export function GamePage({ gameId }: { gameId: string }) {
  const { data, isLoading } = useGame(gameId);
  const {
    auth: { userId },
  } = useAuth();

  const currentPlayer =
    (data?.players ?? []).find((player) => player.user.id === userId) ?? null;

  if (isLoading) {
    return <h1>Starting game...</h1>;
  }

  return (
    <GameLayout game={data} currentPlayer={currentPlayer ?? null}>
      {data?.currentRound.startsWith('dice') && (
        <DiceZone player={currentPlayer} />
      )}
      {data?.currentRound.startsWith('shop') && <div>SHOP</div>}
    </GameLayout>
  );
}
