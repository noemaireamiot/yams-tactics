import { Injectable } from '@nestjs/common';
import {
  CrudService,
  InjectRepository,
  Repository,
  Room,
} from '@yams-tactics/backend-database';

@Injectable()
export class RoomService extends CrudService(Room) {
  constructor(
    @InjectRepository(Room)
    private repo: Repository<Room>
  ) {
    super(repo);
  }
}
