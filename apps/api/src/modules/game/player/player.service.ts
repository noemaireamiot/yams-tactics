import { Injectable } from '@nestjs/common';
import {
  CrudService,
  Player,
  InjectRepository,
  Repository,
  Game,
} from '@yams-tactics/backend-database';
import {
  ActionTypeEnum,
  UserModel,
  computeDicesRoll,
} from '@yams-tactics/domain';

@Injectable()
export class PlayerService extends CrudService(Player) {
  constructor(
    @InjectRepository(Player) public playerRepo: Repository<Player>,
    @InjectRepository(Game) private gameRepo: Repository<Game>
  ) {
    super(playerRepo);
  }

  actions(type: ActionTypeEnum, currentUser: UserModel) {
    const game = this.gameRepo.findOneWhere(
      (game) =>
        !!game.players.find((player) => player.user.id === currentUser.id)
    );

    const player = game.players.find(
      (player) => player.user.id === currentUser.id
    );

    switch (type) {
      case ActionTypeEnum.roll_dices: {
        game.players = game.players.map((p) => {
          if (p.id !== player.id) {
            return p;
          }

          const faces = computeDicesRoll(player);
          return {
            ...p,
            actions: [...player.actions, { type: ActionTypeEnum.roll_dices }],
            dices: player.dices.map((dice, i) => {
              return { ...dice, currentFace: faces[i] };
            }),
          };
        });
        this.gameRepo.updateOne(game.id, game);
        break;
      }
      default: {
        console.info(`action type ${type} unknown`);
      }
    }
  }
}
