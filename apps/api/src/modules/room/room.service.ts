import { BadRequestException, Injectable } from '@nestjs/common';
import {
  CrudService,
  InjectRepository,
  Repository,
  Room,
} from '@yams-tactics/backend-database';
import { RoomService as BaseRoomService } from '@yams-tactics/backend-modules-room';
import { PLAYER_PER_ROOM, UserModel } from '@yams-tactics/domain';

@Injectable()
export class RoomService extends CrudService(Room) {
  constructor(
    @InjectRepository(Room)
    private roomRepo: Repository<Room>,
    private baseService: BaseRoomService
  ) {
    super(roomRepo);
  }

  join(id: string, user: UserModel) {
    const room = this.roomRepo.findOne(id);

    if (room.users.length >= PLAYER_PER_ROOM)
      throw new BadRequestException('Too many players');

    if (room.users.some((u) => u.id === user.id))
      throw new BadRequestException('Already joined');

    return this.baseService.join(id, user);
  }
}
