import { DiceModel } from '../../../model';

export const findNStraight = (n: number, dices: DiceModel[]): boolean => {
  const values = dices.map((dice) => dice.currentFace?.value ?? 0);
  const sortedValues = [...new Set([...values])].sort((a, b) =>
    a > b ? 1 : -1
  );

  let maxCount = 0;
  let count = 1;
  for (let i = 0; i < sortedValues.length - 1; i++) {
    if (sortedValues[i] + 1 === sortedValues[i + 1]) {
      count++;
      if (count > maxCount) {
        maxCount = count;
      }
    } else {
      count = 0;
    }
  }

  return maxCount >= n;
};
