import { Injectable, MessageEvent, Param, Res, Sse } from '@nestjs/common';
import { CrudController } from '@yams-tactics/backend-database';
import { Game } from '@yams-tactics/backend-database';
import { GameService } from './game.service';
import { GameService as BaseGameService } from '@yams-tactics/backend-modules-game';
import { Observable, interval, map } from 'rxjs';
import { Response } from 'express';
import { maxTime } from '@yams-tactics/domain';

@Injectable()
export class GameController extends CrudController(Game, {
  getOne: false,
  deleteOne: false,
  updateOne: false,
}) {
  constructor(
    public service: GameService,
    private baseService: BaseGameService
  ) {
    super(service);
  }

  @Sse('/:id')
  getOne(
    @Param('id') id: string,
    @Res() res: Response
  ): Observable<MessageEvent> {
    return interval(1000).pipe(
      map(() => {
        const game = this.service.getOne(id);
        const elapsedTime = (+new Date() - +game.startedAt) / 1000;

        // Close SSE after game
        if (elapsedTime > maxTime) res.socket.end();

        return { data: game };
      })
    );
  }
}
