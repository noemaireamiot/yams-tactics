import { ActionTypeEnum } from '../../enum';
import { GameModel } from '../../model';
import { computeDicesRoll } from './dice';
import { getRoundFromTime, maxTime } from './round.definition';

export function gameLoop(
  game: GameModel,
  { gameUpdateFn }: { gameUpdateFn: (game: GameModel) => void }
) {
  const interval = setInterval(() => {
    const time = (+new Date() - +game.startedAt) / 1000;
    console.info('loop game: ', game.id);

    const currentRound = getRoundFromTime(time).round;
    if (currentRound !== game.currentRound) {
      if (currentRound.startsWith('dice')) {
        game.players = game.players.map((player) => {
          const faces = computeDicesRoll(player);
          return {
            ...player,
            actions: [...player.actions, { type: ActionTypeEnum.roll_dices }],
            dices: player.dices.map((dice, i) => {
              return { ...dice, currentFace: faces[i] };
            }),
          };
        });
      }
      game.currentRound = currentRound;
    }

    gameUpdateFn(game);
    if (time > maxTime) {
      clearInterval(interval);
    }
  }, 1000);
}