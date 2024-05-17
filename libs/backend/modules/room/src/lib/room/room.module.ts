import { Module } from '@nestjs/common';
import { RoomService } from './room.service';

@Module({
  controllers: [],
  providers: [RoomService],
  exports: [],
})
export class RoomModule {}
