import { Module } from '@nestjs/common';
import { GameModule } from './game/game.module';
import { PlayerModule } from './player';

@Module({
  controllers: [],
  providers: [],
  exports: [],
  imports: [GameModule, PlayerModule],
})
export class BackendModulesGameModule {}
