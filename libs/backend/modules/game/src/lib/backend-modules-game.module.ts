import { Module } from '@nestjs/common';
import { GameModule } from './game/game.module';

@Module({
  controllers: [],
  providers: [],
  exports: [],
  imports: [GameModule],
})
export class BackendModulesGameModule {}
