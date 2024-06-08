import { DiceModel, PlayerModel } from '../../../model';
import { getRandomNBetween } from '../../../random';

export const computeDiceRoll = (player: PlayerModel, dice: DiceModel) => {
  const randomFace = getRandomNBetween(
    [player.seed, dice.id, player.actions.length].join(''),
    0,
    dice.faces.length - 1
  );
  return dice.faces[randomFace];
};

export const computeDicesRoll = (player: PlayerModel): DiceModel[] => {
  return player.dices.map<DiceModel>((dice) => {
    return {
      ...dice,
      currentFace: computeDiceRoll(player, dice),
    };
  });
};
