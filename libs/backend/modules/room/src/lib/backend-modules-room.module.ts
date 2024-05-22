import { Module } from '@nestjs/common';
import { RoomModule } from './room';
import { UserModule } from './users';

@Module({
  imports: [RoomModule, UserModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class BackendModulesRoomModule {}
