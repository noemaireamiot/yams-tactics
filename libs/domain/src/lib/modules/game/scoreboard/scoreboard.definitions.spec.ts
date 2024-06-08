import { ScoreTypeEnum } from '../../../enum';
import { DiceModel } from '../../../model';
import { scoreboardDefinitions } from './scoreboard.definitions';

describe('Scoreboard definition', () => {
  describe.each([
    {
      diceRoll: [1, 2, 3, 4, 5],
      score: {
        [ScoreTypeEnum.total_1]: 1,
        [ScoreTypeEnum.total_2]: 2,
        [ScoreTypeEnum.total_3]: 3,
        [ScoreTypeEnum.total_4]: 4,
        [ScoreTypeEnum.total_5]: 5,
        [ScoreTypeEnum.total_6]: 0,
        [ScoreTypeEnum.three_of_a_kind]: 0,
        [ScoreTypeEnum.four_of_a_kind]: 0,
        [ScoreTypeEnum.full]: 0,
        [ScoreTypeEnum.small_straight]: 30,
        [ScoreTypeEnum.straight]: 40,
        [ScoreTypeEnum.five_of_a_kind]: 0,
        [ScoreTypeEnum.lucky]: 15,
      },
    },
    {
      diceRoll: [1, 1, 1, 1, 1],
      score: {
        [ScoreTypeEnum.total_1]: 5,
        [ScoreTypeEnum.total_2]: 0,
        [ScoreTypeEnum.total_3]: 0,
        [ScoreTypeEnum.total_4]: 0,
        [ScoreTypeEnum.total_5]: 0,
        [ScoreTypeEnum.total_6]: 0,
        [ScoreTypeEnum.three_of_a_kind]: 3,
        [ScoreTypeEnum.four_of_a_kind]: 4,
        [ScoreTypeEnum.full]: 0,
        [ScoreTypeEnum.small_straight]: 0,
        [ScoreTypeEnum.straight]: 0,
        [ScoreTypeEnum.five_of_a_kind]: 50,
        [ScoreTypeEnum.lucky]: 5,
      },
    },
    {
      diceRoll: [4, 4, 4, 4, 4],
      score: {
        [ScoreTypeEnum.total_1]: 0,
        [ScoreTypeEnum.total_2]: 0,
        [ScoreTypeEnum.total_3]: 0,
        [ScoreTypeEnum.total_4]: 20,
        [ScoreTypeEnum.total_5]: 0,
        [ScoreTypeEnum.total_6]: 0,
        [ScoreTypeEnum.three_of_a_kind]: 12,
        [ScoreTypeEnum.four_of_a_kind]: 16,
        [ScoreTypeEnum.full]: 0,
        [ScoreTypeEnum.small_straight]: 0,
        [ScoreTypeEnum.straight]: 0,
        [ScoreTypeEnum.five_of_a_kind]: 50,
        [ScoreTypeEnum.lucky]: 20,
      },
    },
    {
      diceRoll: [6, 6, 4, 4, 4],
      score: {
        [ScoreTypeEnum.total_1]: 0,
        [ScoreTypeEnum.total_2]: 0,
        [ScoreTypeEnum.total_3]: 0,
        [ScoreTypeEnum.total_4]: 12,
        [ScoreTypeEnum.total_5]: 0,
        [ScoreTypeEnum.total_6]: 12,
        [ScoreTypeEnum.three_of_a_kind]: 12,
        [ScoreTypeEnum.four_of_a_kind]: 0,
        [ScoreTypeEnum.full]: 25,
        [ScoreTypeEnum.small_straight]: 0,
        [ScoreTypeEnum.straight]: 0,
        [ScoreTypeEnum.five_of_a_kind]: 0,
        [ScoreTypeEnum.lucky]: 24,
      },
    },
    {
      diceRoll: [6, 5, 4, 3, 4],
      score: {
        [ScoreTypeEnum.total_1]: 0,
        [ScoreTypeEnum.total_2]: 0,
        [ScoreTypeEnum.total_3]: 3,
        [ScoreTypeEnum.total_4]: 8,
        [ScoreTypeEnum.total_5]: 5,
        [ScoreTypeEnum.total_6]: 6,
        [ScoreTypeEnum.three_of_a_kind]: 0,
        [ScoreTypeEnum.four_of_a_kind]: 0,
        [ScoreTypeEnum.full]: 0,
        [ScoreTypeEnum.small_straight]: 30,
        [ScoreTypeEnum.straight]: 0,
        [ScoreTypeEnum.five_of_a_kind]: 0,
        [ScoreTypeEnum.lucky]: 22,
      },
    },
  ])('For diceRoll $diceRoll', ({ diceRoll, score }) => {
    const dices = diceRoll.map((value) => ({
      currentFace: { value },
    })) as DiceModel[];

    it.each(Object.entries(score).map(([type, value]) => ({ type, value })))(
      '$type should give $value',
      ({ value, type }) => {
        expect(
          scoreboardDefinitions[type as ScoreTypeEnum].computeValue(dices)
        ).toBe(value);
      }
    );
  });
});
