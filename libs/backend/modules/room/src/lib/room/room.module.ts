import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { GameModule } from '@yams-tactics/backend-modules-game';

@Module({
  imports: [GameModule],
  providers: [RoomService],
  exports: [RoomService],
})
export class RoomModule {}
