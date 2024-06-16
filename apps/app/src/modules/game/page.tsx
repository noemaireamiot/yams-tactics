import { GameLayout } from './layouts/game-layout';
import { useGameContext } from '@yams-tactics/frontend-common';
import { DiceZone } from './dice';
import { ShopZone } from './shop';

export function GamePage() {
  const { isLoading, game, currentPlayer } = useGameContext();

  if (isLoading) {
    return <h1>Starting game...</h1>;
  }

  return (
    <GameLayout currentPlayer={currentPlayer}>
      {game?.currentRound.startsWith('dice') && currentPlayer && <DiceZone />}
      {game?.currentRound.startsWith('shop') && currentPlayer && <ShopZone />}
    </GameLayout>
  );
}
