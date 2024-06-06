import { Injectable, UseGuards } from '@nestjs/common';
import { CrudController } from '@yams-tactics/backend-database';
import { Game } from '@yams-tactics/backend-database';
import { GameService } from './game.service';
import { JwtAuthGuard } from '@yams-tactics/backend-modules-foundation';

@Injectable()
@UseGuards(JwtAuthGuard)
export class GameController extends CrudController(Game, {
  deleteOne: false,
  updateOne: false,
}) {
  constructor(public service: GameService) {
    super(service);
  }

  // This may come back
  // @Sse('/:id')
  // getOne(
  //   @Param('id') id: string,
  //   @Res() res: Response
  // ): Observable<MessageEvent> {
  //   return interval(1000).pipe(
  //     map(() => {
  //       const game = this.service.getOne(id);
  //       const elapsedTime = (+new Date() - +game.startedAt) / 1000;

  //       // Close SSE after game
  //       if (elapsedTime > maxTime) res.socket.end();

  //       return { data: game };
  //     })
  //   );
  // }
}
