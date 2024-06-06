import { GameModel } from '../../model';
import { onRollDices } from './player';
import { getRoundFromTime, maxTime } from './round.definition';

export const GAME_RATE = 3000;

export function gameLoop(
  game: GameModel,
  {
    gameRate = GAME_RATE,
    gameUpdateFn,
  }: { gameRate?: number; gameUpdateFn: (game: GameModel) => void }
): { clearInterval: () => void } {
  const interval = setInterval(async () => {
    const startedAt = new Date(game.startedAt);
    const time = (+new Date() - +startedAt) / 1000;
    const currentRound = getRoundFromTime(time).round;

    if (currentRound !== game.currentRound) {
      if (currentRound.startsWith('dice')) {
        await Promise.all(
          game.players.map(async (player, i) => {
            await onRollDices(
              {
                player,
                dices: player.dices.map((_, i) => i),
                round: currentRound,
              },
              async (player) => {
                game.players[i] = player;
              }
            );
          })
        );
      }

      game.currentRound = currentRound;
    }

    gameUpdateFn(game);

    if (time > maxTime) {
      clearInterval(interval);
    }
  }, gameRate);

  return {
    clearInterval: () => clearInterval(interval),
  };
}
