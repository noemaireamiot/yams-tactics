import { ScoreTypeEnum } from '../../../enum';
import { DiceModel } from '../../../model';

const sumDice = (dices: DiceModel[]) =>
  dices.reduce((acc, dice) => acc + (dice.currentFace?.value ?? 0), 0);

const findNOfAKind = (n: number, dices: DiceModel[]) => {
  const dicesPerFaceValue = dices.reduce<Record<number, number>>(
    (acc, dice) => {
      if (dice.currentFace)
        return {
          ...acc,
          [dice.currentFace.value]: acc[dice.currentFace.value] ?? 0 + 1,
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

export const scoreboardDefinitions: Record<
  ScoreTypeEnum,
  {
    name: string;
    computeValue: typeof sumDice;
  }
> = {
  total_1: {
    name: 'Total 1',
    computeValue: (dices) =>
      sumDice(dices.filter((dice) => dice.currentFace?.value === 1)),
  },
  total_2: {
    name: 'Total 2',
    computeValue: (dices) =>
      sumDice(dices.filter((dice) => dice.currentFace?.value === 2)),
  },
  total_3: {
    name: 'Total 3',
    computeValue: (dices) =>
      sumDice(dices.filter((dice) => dice.currentFace?.value === 3)),
  },
  total_4: {
    name: 'Total 4',
    computeValue: (dices) =>
      sumDice(dices.filter((dice) => dice.currentFace?.value === 4)),
  },
  total_5: {
    name: 'Total 5',
    computeValue: (dices) =>
      sumDice(dices.filter((dice) => dice.currentFace?.value === 5)),
  },
  total_6: {
    name: 'Total 6',
    computeValue: (dices) =>
      sumDice(dices.filter((dice) => dice.currentFace?.value === 6)),
  },
  three_of_a_kind: {
    name: 'Three of a kind',
    computeValue: (dices) => {
      return findNOfAKind(3, dices) * 3;
    },
  },
  four_of_a_kind: {
    name: 'Four of a kind',
    computeValue: (dices) => {
      return findNOfAKind(4, dices) * 4;
    },
  },
  full: {
    name: 'Full',
    computeValue: () => 25,
  },
  small_straight: {
    name: 'Small straight',
    computeValue: () => 30,
  },
  straight: {
    name: 'Straight',
    computeValue: () => 40,
  },
  five_of_a_kind: {
    name: 'Yams',
    computeValue: () => 50,
  },
  lucky: {
    name: '☘',
    computeValue: sumDice,
  },
};
