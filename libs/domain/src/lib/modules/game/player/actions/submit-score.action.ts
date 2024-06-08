import { DiceModel, PlayerModel, Round } from '../../../../model';

export async function onSubmitScore(
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
  void player, dices, round, onUpdatePlayer;
  throw 'TODO';
}
