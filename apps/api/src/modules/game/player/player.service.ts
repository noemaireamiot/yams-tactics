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
  actionDefinition,
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

  actions(action: Action, currentUser: UserModel) {
    const game = this.gameRepo.findOneWhere(
      (game) =>
        !!game.players.find((player) => player.user.id === currentUser.id)
    );

    const player = game.players.find(
      (player) => player.user.id === currentUser.id
    );

    switch (action.type) {
      case ActionTypeEnum.roll_dices: {
        game.players = game.players.map((p) => {
          if (p.id !== player.id) {
            return p;
          }

          const faces = computeDicesRoll(player);
          return {
            ...p,
            actions: [
              ...player.actions,
              actionDefinition.roll_dices(action.dices),
            ],
            dices: player.dices.map((dice, i) => {
              return {
                ...dice,
                currentFace: action.dices.includes(i)
                  ? faces[i]
                  : dice.currentFace,
              };
            }),
          };
        });
        this.gameRepo.updateOne(game.id, game);
        break;
      }
      default: {
        console.info(`action type ${action.type} unknown`);
      }
    }
  }
}
