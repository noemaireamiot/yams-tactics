import { Injectable, MessageEvent, Param, Post, Sse } from '@nestjs/common';
import { CrudController } from '@yams-tactics/backend-database';
import { Game } from '@yams-tactics/backend-database';
import { GameService } from './game.service';
import { Observable, interval, map } from 'rxjs';

@Injectable()
export class GameController extends CrudController(Game, {
  getOne: false,
  deleteOne: false,
  updateOne: false,
}) {
  constructor(public service: GameService) {
    super(service);
  }

  @Sse('/:id')
  getOne(@Param('id') id: string): Observable<MessageEvent> {
    return interval(1000).pipe(map(() => ({ data: this.service.getOne(id) })));
  }

  @Post('/:id/start')
  startGame(@Param('id') id: string) {
    return this.service.start(id);
  }
}
