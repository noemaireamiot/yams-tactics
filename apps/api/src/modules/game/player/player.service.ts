import { Injectable } from '@nestjs/common';
import {
  CrudService,
  Player,
  InjectRepository,
  Repository,
  Game,
} from '@yams-tactics/backend-database';
import {
  Action,
  ActionTypeEnum,
  UserModel,
  onRollDices,
} from '@yams-tactics/domain';

@Injectable()
export class PlayerService extends CrudService(Player) {
  constructor(
    @InjectRepository(Player) public playerRepo: Repository<Player>,
    @InjectRepository(Game) private gameRepo: Repository<Game>
  ) {
    super(playerRepo);
  }

  async actions(action: Action, currentUser: UserModel) {
    const game = this.gameRepo.findOneWhere(
      (game) =>
        !!game.players.find((player) => player.user.id === currentUser.id)
    );

    const player = game.players.find(
      (player) => player.user.id === currentUser.id
    );

    switch (action.type) {
      case ActionTypeEnum.roll_dices: {
        await onRollDices(
          { player, dices: action.dices, round: action.round },
          async (player) => {
            game.players = game.players.map((p) =>
              p.id === player.id ? player : p
            );

            await this.gameRepo.updateOne(game.id, game);
          }
        );
        break;
      }
      default: {
        console.info(`action type ${action.type} unknown`);
      }
    }
  }
}
