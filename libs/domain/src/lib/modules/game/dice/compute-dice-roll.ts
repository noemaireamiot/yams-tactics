import { DiceModel, FaceModel, PlayerModel } from '../../../model';
import { getRandomNBetween } from '../../../random';

export const computeDiceRoll = (
  player: PlayerModel,
  dice: DiceModel,
  n: number
) => {
  const randomFace = getRandomNBetween(
    player.seed,
    n,
    0,
    dice.faces.length - 1
  );
  return dice.faces[randomFace];
};

export const computeDicesRoll = (player: PlayerModel): FaceModel[] => {
  const faces = player.dices.map((dice) => {
    player.actions.push('roll dice');
    return computeDiceRoll(player, dice, player.actions.length);
  });

  return faces;
};
