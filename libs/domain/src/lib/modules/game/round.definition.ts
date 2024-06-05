import { Round } from '../../model';

export const ROUND_COUNT = 13;
export const ROUND_BASE_TIME = 30;
export const roundDefinition: Partial<Record<Round, { time: number }>> = {};

export function getRoundDefinition(round?: Round) {
  const explicit = round && roundDefinition[round];
  if (explicit) return explicit;

  return { time: ROUND_BASE_TIME };
}

export function roundsFactory() {
  return new Array(ROUND_COUNT).fill(0).reduce<Round[]>((acc, e, i) => {
    const round = i + 1;
    return [...acc, `shop.${round}`, `dice.${round}`];
  }, []);
}

export const maxTime = roundsFactory().reduce(
  (acc, round) => acc + getRoundDefinition(round).time,
  0
);

export function getRoundFromTime(elapsedTime: number) {
  const rounds = roundsFactory();

  return rounds.reduce<{
    done: boolean;
    left: number;
    round: Round;
  }>(
    (acc, round) => {
      if (acc.done) return acc;

      const roundDefinition = getRoundDefinition(round);

      const left = acc.left - roundDefinition.time;

      if (left <= 0) return { ...acc, round, left, done: true };

      return { ...acc, round, left };
    },
    { done: false, left: elapsedTime, round: rounds[0] }
  );
}
