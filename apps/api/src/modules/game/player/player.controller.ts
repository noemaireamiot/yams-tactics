import { Body, Injectable, Param, Post } from '@nestjs/common';
import { CrudController } from '@yams-tactics/backend-database';
import { Player } from '@yams-tactics/backend-database';
import { PlayerService } from './player.service';
import { ActionInput } from './dto';

@Injectable()
export class PlayerController extends CrudController(Player, {
  deleteOne: false,
  updateOne: false,
}) {
  constructor(public service: PlayerService) {
    super(service);
  }

  @Post('/:id/actions')
  actions(@Param('id') id: string, @Body() { type }: ActionInput) {
    void id, type;
    return {};
  }
}
