import { Injectable, Param, Post, Req } from '@nestjs/common';
import { RoomService } from './room.service';
import { CrudController, Room, User } from '@yams-tactics/backend-database';
import { Request } from 'express';

@Injectable()
export class RoomController extends CrudController(Room, {
  deleteOne: false,
  updateOne: false,
}) {
  constructor(public roomService: RoomService) {
    super(roomService);
  }

  @Post('/:id/start')
  startGame(@Param('id') id: string) {
    return this.roomService.startGame(id);
  }

  @Post('/:id/join')
  join(@Param('id') id: string, @Req() request: Request) {
    // const user = request;
    void request;
    const user = new User();
    return this.roomService.join(id, user);
  }
}
