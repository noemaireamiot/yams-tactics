import { Injectable } from '@nestjs/common';
import {
  Dice,
  Game,
  InjectRepository,
  Player,
  Repository,
  Room,
  Scoreboard,
  Token,
} from '@yams-tactics/backend-database';
import { PLAYER_PER_ROOM, TokenTypeEnum, gameLoop } from '@yams-tactics/domain';
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
        players: [
          ...room.users.map((user) => {
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
                tokens: [new Token({ type: TokenTypeEnum.minus_one })],
              })
            );
          }),
          ...new Array(PLAYER_PER_ROOM - room.users.length)
            .fill(0)
            .map((e, i) => {
              const index = room.users.length + i + 1;
              const botAvatar =
                'https://s22908.pcdn.co/wp-content/uploads/2022/02/what-are-bots.jpg';

              return new Player({
                user: {
                  name: `Bot ${index}`,
                  id: v4(),
                  avatar: botAvatar,
                },
              });
            }),
        ],
      })
    );

    gameLoop(game, {
      gameUpdateFn: (game) => this.gameRepo.updateOne(game.id, game),
    });

    return game;
  }
}
