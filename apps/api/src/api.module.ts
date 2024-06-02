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
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@yams-tactics/backend-modules-foundation';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AppModule,
    AuthModule,
    RoomModule,
    GameModule,
    UserModule,
  ],
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
