import { Injectable } from '@nestjs/common';
import {
  CrudService,
  Game,
  InjectRepository,
  Repository,
} from '@yams-tactics/backend-database';
import { getRoundFromTime, maxTime } from '@yams-tactics/domain';

@Injectable()
export class GameService extends CrudService(Game) {
  constructor(@InjectRepository(Game) repo: Repository<Game>) {
    super(repo);
  }

  gameLoop(id: string) {
    const game = this.getOne(id);
    const interval = setInterval(() => {
      const time = (+new Date() - +game.startedAt) / 1000;

      const currentRound = getRoundFromTime(time);

      this.updateOne(game.id, {
        currentRound,
      });

      if (time > maxTime) {
        clearInterval(interval);
      }
    }, 5000);
  }

  start(id: string) {
    this.updateOne(id, { startedAt: new Date() });
    this.gameLoop(id);
  }
}
