import { GameLayout } from './layouts/game-layout';
import { useGameContext } from '@yams-tactics/frontend-common';
import { DiceZone } from './dice';

export function GamePage() {
  const { isLoading, game, currentPlayer } = useGameContext();

  if (isLoading) {
    return <h1>Starting game...</h1>;
  }

  return (
    <GameLayout currentPlayer={currentPlayer}>
      {game?.currentRound.startsWith('dice') && currentPlayer && (
        <DiceZone player={currentPlayer} />
      )}
      {game?.currentRound.startsWith('shop') && <div>SHOP</div>}
    </GameLayout>
  );
}
