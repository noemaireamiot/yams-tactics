import { Injectable } from '@nestjs/common';
import {
  CrudService,
  Dice,
  Game,
  InjectRepository,
  Player,
  Repository,
  Room,
} from '@yams-tactics/backend-database';
import {
  computeDicesRoll,
  getRoundFromTime,
  maxTime,
} from '@yams-tactics/domain';
import { v4 } from 'uuid';

@Injectable()
export class GameService extends CrudService(Game) {
  constructor(
    @InjectRepository(Game) public gameRepo: Repository<Game>,
    @InjectRepository(Player) public playerRepo: Repository<Player>,
    @InjectRepository(Dice) public diceRepo: Repository<Dice>
  ) {
    super(gameRepo);
  }

  gameLoop(id: string) {
    const game = this.getOne(id);
    const interval = setInterval(() => {
      const time = (+new Date() - +game.startedAt) / 1000;
      console.info('loop game: ', id);

      const currentRound = getRoundFromTime(time);
      console.info(currentRound);

      game.players.forEach((_, i) => {
        game.players[i].actions.push('roll');
        // not working
        const faces = computeDicesRoll(game.players[i]);
        console.info(faces);
        game.players[i].dices.forEach((_, j) => {
          game.players[i].dices[j].currentFace = faces[j];
        });
      });

      this.updateOne(game.id, {
        ...game,
        currentRound,
      });

      if (time > maxTime) {
        clearInterval(interval);
      }
    }, 5000);
  }

  start(room: Room) {
    const game = this.updateOne(room.game?.id, {
      startedAt: new Date(),
      players: room.users.map((user) => {
        const dices = new Array(5)
          .fill(0)
          .map(() => this.diceRepo.createOne(new Dice()));

        return this.playerRepo.createOne(
          new Player({
            seed: v4(),
            user,
            dices,
          })
        );
      }),
    });

    console.info(game.players[0]);

    this.gameLoop(game.id);

    room.game = game;

    return game;
  }
}
