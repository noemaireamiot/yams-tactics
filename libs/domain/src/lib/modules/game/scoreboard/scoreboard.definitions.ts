import { ScoreTypeEnum } from '../../../enum';
import { DiceModel } from '../../../model';

const sumDice = (dices: DiceModel[]) =>
  dices.reduce((acc, dice) => acc + (dice.currentFace?.value ?? 0), 0);

// Better unit test that some day
const findNOfAKind = (n: number, dices: DiceModel[]) => {
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

// Better unit test that some day
const findNStraight = (n: number, dices: DiceModel[]): boolean => {
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
    computeValue: (dices) => {
      const threeOfAKind = findNOfAKind(3, dices);
      const otherDices = dices.filter(
        (dice) => dice.currentFace?.value !== threeOfAKind
      );

      const [dice1, dice2] = otherDices;

      if (
        otherDices.length === 2 &&
        dice1.currentFace?.value === dice2.currentFace?.value
      ) {
        return 25;
      }

      return 0;
    },
  },
  small_straight: {
    name: 'Small straight',
    computeValue: (dices) => {
      return findNStraight(4, dices) ? 30 : 0;
    },
  },
  straight: {
    name: 'Straight',
    computeValue: (dices) => {
      return findNStraight(5, dices) ? 40 : 0;
    },
  },
  five_of_a_kind: {
    name: 'Yams',
    computeValue: (dices) => (findNOfAKind(5, dices) ? 50 : 0),
  },
  lucky: {
    name: '☘',
    computeValue: sumDice,
  },
};
