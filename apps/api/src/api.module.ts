import {
  ClassSerializerInterceptor,
  Module,
  ValidationPipe,
} from '@nestjs/common';

import { DatabaseModule } from '@yams-tactics/backend-database';
import { AppModule } from './app/app.module';
import { RoomModule } from './modules/room/room.module';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { GameModule } from './modules/game/game.module';
import { UserModule } from './modules/room/user/user.module';

@Module({
  imports: [DatabaseModule, AppModule, RoomModule, GameModule, UserModule],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class ApiModule {}
