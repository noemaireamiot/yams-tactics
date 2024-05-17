import { Injectable } from '@nestjs/common';
import { InMemoryDatabaseService, Room } from '@yams-tactics/backend-database';

@Injectable()
export class AppService {
  constructor(private inMemoryDatabaseService: InMemoryDatabaseService) {}
  getData(): { rooms: Room[] } {
    return {
      rooms: Object.values(
        this.inMemoryDatabaseService.getRepository(Room).store
      ),
    };
  }
}
