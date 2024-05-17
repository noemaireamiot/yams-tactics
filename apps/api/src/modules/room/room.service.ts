import { Injectable } from '@nestjs/common';
import {
  CrudService,
  InMemoryDatabaseService,
  Room,
} from '@yams-tactics/backend-database';

@Injectable()
export class RoomService extends CrudService(Room) {
  constructor(private database: InMemoryDatabaseService) {
    super(database);
  }
}
