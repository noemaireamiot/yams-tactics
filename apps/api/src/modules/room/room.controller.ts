import { Injectable } from '@nestjs/common';
import { RoomService } from './room.service';
import { CrudController, Room } from '@yams-tactics/backend-database';

@Injectable()
export class RoomController extends CrudController(Room, {
  deleteOne: false,
  updateOne: false,
}) {
  constructor(private roomService: RoomService) {
    super(roomService);
  }
}
