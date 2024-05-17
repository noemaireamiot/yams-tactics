import { Module } from '@nestjs/common';

import { DatabaseModule } from '@yams-tactics/backend-database';
import { AppModule } from './app/app.module';
import { RoomModule } from './modules/room/room.module';

@Module({
  imports: [DatabaseModule, AppModule, RoomModule],
})
export class ApiModule {}
