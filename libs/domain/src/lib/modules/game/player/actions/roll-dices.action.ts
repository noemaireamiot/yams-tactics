import { PlayerModel } from '../../../../model';
import { computeDicesRoll } from '../../dice';
import { actionDefinition } from '../action.definition';

export async function onRollDices(
  player: PlayerModel,
  dices: number[],
  onUpdatePlayer: (player: PlayerModel) => Promise<void> | void
) {
  const updatedPlayer = {
    ...player,
    actions: [...player.actions, actionDefinition.roll_dices(dices)],
  };

  const faces = computeDicesRoll(player);

  updatedPlayer.dices = player.dices.map((dice, i) => {
    return {
      ...dice,
      currentFace: dices.includes(i) ? faces[i] : dice.currentFace,
    };
  });

  await onUpdatePlayer(updatedPlayer);
}
