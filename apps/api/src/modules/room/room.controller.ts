import { Injectable, Param, Post, UseGuards } from '@nestjs/common';
import { RoomService } from './room.service';
import { CrudController, Room } from '@yams-tactics/backend-database';
import { RoomService as BaseRoomService } from '@yams-tactics/backend-modules-room';
import {
  CurrentUser,
  JwtAuthGuard,
} from '@yams-tactics/backend-modules-foundation';
import { UserModel } from '@yams-tactics/domain';

@Injectable()
@UseGuards(JwtAuthGuard)
export class RoomController extends CrudController(Room, {
  deleteOne: false,
  updateOne: false,
  // createOne: false,
  // getOne: false,
}) {
  constructor(
    public roomService: RoomService,
    private baseService: BaseRoomService
  ) {
    super(roomService);
  }

  @Post('/')
  createOne(@CurrentUser() user: UserModel) {
    return this.roomService.createOne(new Room({ users: [user] }));
  }

  @Post('/:id/start')
  startGame(@Param('id') id: string) {
    return this.baseService.startGame(id);
  }

  // @Sse('/:id')
  // getOne(@Param('id') id: string): Observable<MessageEvent> {
  //   return interval(1000).pipe(map(() => ({ data: this.service.getOne(id) })));
  // }

  @Post('/:id/join')
  join(@Param('id') id: string, @CurrentUser() user: UserModel) {
    return this.roomService.join(id, user);
  }
}
