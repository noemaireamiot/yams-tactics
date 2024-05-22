import { Injectable } from '@nestjs/common';
import {
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
export class GameService {
  constructor(
    @InjectRepository(Game) public gameRepo: Repository<Game>,
    @InjectRepository(Player) public playerRepo: Repository<Player>,
    @InjectRepository(Dice) public diceRepo: Repository<Dice>
  ) {}

  gameLoop(id: string) {
    const game = this.gameRepo.findOneOrFail(id);
    const interval = setInterval(() => {
      const time = (+new Date() - +game.startedAt) / 1000;
      console.info('loop game: ', id);

      const currentRound = getRoundFromTime(time);

      game.players.forEach((_, i) => {
        const faces = computeDicesRoll(game.players[i]);
        game.players[i].dices.forEach((_, j) => {
          game.players[i].dices[j].currentFace = faces[j];
        });
      });

      this.gameRepo.updateOne(game.id, {
        ...game,
        currentRound,
      });

      if (time > maxTime) {
        clearInterval(interval);
      }
    }, 5000);
  }

  start(room: Room) {
    // initialize game
    const game = this.gameRepo.createOne(
      new Game({
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
      })
    );

    this.gameLoop(game.id);

    return game;
  }
}
