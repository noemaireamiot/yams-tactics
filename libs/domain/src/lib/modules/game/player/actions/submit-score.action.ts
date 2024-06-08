import { ActionTypeEnum } from '../../../../enum/action-type.enum';
import { DiceModel, PlayerModel, Round, ScoreModel } from '../../../../model';
import { scoreboardDefinitions } from '../../scoreboard';
import { actionDefinition } from '../action.definition';

export async function onSubmitScore(
  {
    player,
    dices,
    round,
    score,
  }: {
    player: PlayerModel;
    dices: DiceModel[];
    round: Round;
    score: ScoreModel;
  },
  onUpdatePlayer: (player: PlayerModel) => Promise<void> | void
) {
  if (!canSubmitScoreThisRound(player, round)) {
    console.error('cannot submit');
    return;
  }

  const updatedPlayer: PlayerModel = {
    ...player,
    actions: [
      ...player.actions,
      actionDefinition.submit_score({ dices, round, score }),
    ],
  };

  const computedScore = scoreboardDefinitions[score.type].computeValue(
    updatedPlayer.dices
  );

  updatedPlayer.scoreboard.scores = updatedPlayer.scoreboard.scores.map((s) => {
    return s.id !== score.id
      ? s
      : {
          ...s,
          done: true,
          // @TODO - Recompute value with validation
          value: computedScore,
        };
  });

  await onUpdatePlayer(updatedPlayer);
}

export function canSubmitScoreThisRound(player: PlayerModel, round: Round) {
  const canSubmitThisRound = !player.actions.find((action) => {
    return (
      action.type === ActionTypeEnum.submit_score && action.round === round
    );
  });

  // todo validation score value

  return canSubmitThisRound;
}
