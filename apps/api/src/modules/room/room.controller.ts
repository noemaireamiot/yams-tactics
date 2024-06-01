import {
  Injectable,
  MessageEvent,
  Param,
  Post,
  Req,
  Sse,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { CrudController, Room, User } from '@yams-tactics/backend-database';
import { Request } from 'express';
import { RoomService as BaseRoomService } from '@yams-tactics/backend-modules-room';
import { Observable, interval, map } from 'rxjs';
@Injectable()
export class RoomController extends CrudController(Room, {
  deleteOne: false,
  updateOne: false,
  getOne: false,
}) {
  constructor(
    public roomService: RoomService,
    private baseService: BaseRoomService
  ) {
    super(roomService);
  }

  @Post('/:id/start')
  startGame(@Param('id') id: string) {
    return this.baseService.startGame(id);
  }

  @Sse('/:id')
  getOne(@Param('id') id: string): Observable<MessageEvent> {
    return interval(1000).pipe(map(() => ({ data: this.service.getOne(id) })));
  }

  @Post('/:id/join')
  join(@Param('id') id: string, @Req() request: Request) {
    // const user = request;
    void request;
    const user = new User();
    return this.baseService.join(id, user);
  }
}
