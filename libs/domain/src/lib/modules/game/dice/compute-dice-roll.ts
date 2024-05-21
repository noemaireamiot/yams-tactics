import { DiceModel, FaceModel, PlayerModel } from '../../../model';
import { getRandomNBetween } from '../../../random';

export const computeDiceRoll = (
  player: PlayerModel,
  dice: DiceModel,
  n: number
) => {
  console.info(getRandomNBetween(player.seed, n, 0, dice.faces.length));
  return dice.faces[getRandomNBetween(player.seed, n, 0, dice.faces.length)];
};

export const computeDicesRoll = (player: PlayerModel): FaceModel[] => {
  const faces = player.dices.map((dice) =>
    computeDiceRoll(player, dice, player.actions.length)
  );

  return faces;
};
