import { Injectable } from '@nestjs/common';
import {
  InjectRepository,
  Repository,
  Room,
} from '@yams-tactics/backend-database';
import { GameService } from '@yams-tactics/backend-modules-game';
import { RoomStatusEnum, UserModel } from '@yams-tactics/domain';
@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private repo: Repository<Room>,
    private gameService: GameService
  ) {}

  startGame(id: string) {
    const room = this.repo.findOneOrFail(id);
    const game = this.gameService.start(room);
    const updatedRoom = this.repo.updateOne(id, {
      game,
      status: RoomStatusEnum.playing,
    });
    return updatedRoom;
  }

  join(id: string, user: UserModel) {
    const room = this.repo.findOneOrFail(id);
    return this.repo.updateOne(id, { users: [...room.users, user] });
  }
}
