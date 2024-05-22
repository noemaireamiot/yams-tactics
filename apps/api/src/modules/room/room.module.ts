import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { RoomModule as BaseRoomModule } from '@yams-tactics/backend-modules-room';
@Module({
  imports: [BaseRoomModule],
  providers: [RoomService],
  controllers: [RoomController],
  exports: [RoomService],
})
export class RoomModule {}
