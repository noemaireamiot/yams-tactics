import { Module } from '@nestjs/common';
import { RoomModule } from './room';

@Module({
  imports: [RoomModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class BackendModulesRoomModule {}
