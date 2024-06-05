import { Body, Injectable, Post, UseGuards } from '@nestjs/common';
import { CrudController } from '@yams-tactics/backend-database';
import { Player } from '@yams-tactics/backend-database';
import { PlayerService } from './player.service';
import { ActionInput } from './dto';
import {
  CurrentUser,
  JwtAuthGuard,
} from '@yams-tactics/backend-modules-foundation';
import { UserModel } from '@yams-tactics/domain';

@Injectable()
@UseGuards(JwtAuthGuard)
export class PlayerController extends CrudController(Player, {
  deleteOne: false,
  updateOne: false,
}) {
  constructor(public service: PlayerService) {
    super(service);
  }

  @Post('/actions')
  async actions(
    @Body() { action }: ActionInput,
    @CurrentUser() user: UserModel
  ) {
    await this.service.actions(action, user);
  }
}
