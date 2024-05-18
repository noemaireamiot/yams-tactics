import { ROUND_BASE_TIME, getRoundFromTime } from './round.definition';

describe('getRoundFromTime', () => {
  it.each([
    { time: -100, round: `shop.1` },
    { time: 0, round: `shop.1` },
    { time: ROUND_BASE_TIME - 1, round: `shop.1` },
    { time: ROUND_BASE_TIME, round: `shop.1` },
    { time: ROUND_BASE_TIME + 1, round: `dice.1` },
    { time: ROUND_BASE_TIME * 10, round: `dice.5` },
    { time: ROUND_BASE_TIME * 14, round: `dice.7` },
    { time: 15000, round: `dice.13` },
  ])('should get correct round $round for $time', ({ time, round }) => {
    expect(getRoundFromTime(time)).toBe(round);
  });
});
