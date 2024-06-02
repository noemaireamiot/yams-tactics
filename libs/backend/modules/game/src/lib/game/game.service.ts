import { Injectable } from '@nestjs/common';
import {
  Dice,
  Game,
  InjectRepository,
  Player,
  Repository,
  Room,
  Scoreboard,
} from '@yams-tactics/backend-database';
import { gameLoop } from '@yams-tactics/domain';
import { v4 } from 'uuid';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game) public gameRepo: Repository<Game>,
    @InjectRepository(Player) public playerRepo: Repository<Player>,
    @InjectRepository(Dice) public diceRepo: Repository<Dice>
  ) {}

  start(room: Room) {
    // initialize game
    const game = this.gameRepo.createOne(
      new Game({
        startedAt: new Date(),
        players: room.users.map((user) => {
          const dices = new Array(5)
            .fill(0)
            .map(() => this.diceRepo.createOne(new Dice()));

          const scoreboard = new Scoreboard();
          const gold = 5;
          const defaultAvatar =
            'https://media.anti-crise.fr/2020/12/292776_w300h290.jpg';
          user.avatar = user.avatar || defaultAvatar;

          return this.playerRepo.createOne(
            new Player({
              seed: v4(),
              gold,
              user,
              dices,
              scoreboard,
            })
          );
        }),
      })
    );

    gameLoop(game, {
      gameUpdateFn: (game) => this.gameRepo.updateOne(game.id, game),
    });

    return game;
  }
}
