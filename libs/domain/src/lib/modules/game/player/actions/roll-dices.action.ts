import { DiceModel, PlayerModel, Round } from '../../../../model';
import { ActionTypeEnum } from '../../../../enum';
import { computeDicesRoll } from '../../dice';
import { actionDefinition } from '../action.definition';
import { MAX_DICE_ROLLS_ACTION_PER_ROUND } from './constants';

export async function onRollDices(
  {
    player,
    dices,
    round,
  }: {
    player: PlayerModel;
    dices: DiceModel[];
    round: Round;
  },
  onUpdatePlayer: (player: PlayerModel) => Promise<void> | void
) {
  if (!canRollDiceThisRound(player, round)) {
    console.error('cannot roll dice');
    return;
  }

  const updatedPlayer: PlayerModel = {
    ...player,
    actions: [...player.actions, actionDefinition.roll_dices({ dices, round })],
  };

  const rolledDices = computeDicesRoll(updatedPlayer);

  updatedPlayer.dices = player.dices.map((dice, i) => {
    if (!dices.map((dice) => dice.id).includes(dice.id)) {
      return dice;
    }
    return rolledDices[i];
  });

  await onUpdatePlayer(updatedPlayer);
}

export function canRollDiceThisRound(player: PlayerModel, round: Round) {
  const diceRollThisRound = player.actions.filter((action) => {
    return action.type === ActionTypeEnum.roll_dices && action.round === round;
  });

  if (player.scoreboard.scores.every((score) => score.done)) {
    return false;
  }

  return diceRollThisRound.length < MAX_DICE_ROLLS_ACTION_PER_ROUND;
}
