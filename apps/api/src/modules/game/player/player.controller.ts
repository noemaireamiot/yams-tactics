import { Injectable } from '@nestjs/common';
import { CrudController } from '@yams-tactics/backend-database';
import { Player } from '@yams-tactics/backend-database';
import { PlayerService } from './player.service';

@Injectable()
export class PlayerController extends CrudController(Player, {
  deleteOne: false,
  updateOne: false,
}) {
  constructor(public service: PlayerService) {
    super(service);
  }
}
