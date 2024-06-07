import { PlayerModel, Round } from '../../../../model';
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
    dices: number[];
    round: Round;
  },
  onUpdatePlayer: (player: PlayerModel) => Promise<void> | void
) {
  if (!canRollDiceThisRound(player, round)) {
    return;
  }

  const updatedPlayer = {
    ...player,
    actions: [...player.actions, actionDefinition.roll_dices(dices, round)],
  };

  const faces = computeDicesRoll(player);

  updatedPlayer.dices = player.dices.map((dice, i) => {
    return {
      ...dice,
      currentFace: dices.includes(i) ? faces[i] : dice.currentFace,
    };
  });

  await onUpdatePlayer(updatedPlayer);
}

export function canRollDiceThisRound(player: PlayerModel, round: Round) {
  const diceRollThisRound = player.actions.filter((action) => {
    return action.type === ActionTypeEnum.roll_dices && action.round === round;
  });

  return diceRollThisRound.length < MAX_DICE_ROLLS_ACTION_PER_ROUND;
}
