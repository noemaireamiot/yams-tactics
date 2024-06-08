import { DiceModel } from '../../../model';

export const findNOfAKind = (n: number, dices: DiceModel[]) => {
  const dicesPerFaceValue = dices.reduce<Record<number, number>>(
    (acc, dice) => {
      if (dice.currentFace)
        return {
          ...acc,
          [dice.currentFace.value]: (acc[dice.currentFace.value] ?? 0) + 1,
        };
      return acc;
    },
    {}
  );

  const value = Object.entries(dicesPerFaceValue).find(
    ([, value]) => value >= n
  )?.[0];

  return Number(value ?? 0);
};
