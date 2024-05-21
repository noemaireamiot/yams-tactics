import { Injectable } from '@nestjs/common';
import {
  CrudService,
  InjectRepository,
  Repository,
  Room,
} from '@yams-tactics/backend-database';
import { GameService } from '@yams-tactics/backend-modules-game';
import { RoomStatusEnum, UserModel } from '@yams-tactics/domain';

@Injectable()
export class RoomService extends CrudService(Room) {
  constructor(
    @InjectRepository(Room)
    private repo: Repository<Room>,
    private gameService: GameService
  ) {
    super(repo);
  }

  startGame(id: string) {
    const updatedRoom = this.updateOne(id, {
      game: this.gameService.createOne(),
      status: RoomStatusEnum.playing,
    });
    this.gameService.start(updatedRoom);
    return updatedRoom;
  }

  join(id: string, user: UserModel) {
    const room = this.getOne(id);
    return this.updateOne(id, { users: [...room.users, user] });
  }
}
