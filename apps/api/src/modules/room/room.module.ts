import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { UserModule } from './user/user.module';
import { GameModule } from '@yams-tactics/backend-modules-game';

@Module({
  imports: [UserModule, GameModule],
  providers: [RoomService],
  controllers: [RoomController],
  exports: [RoomService],
})
export class RoomModule {}
