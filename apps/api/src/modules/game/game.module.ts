import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { GameModule as BaseGameModule } from '@yams-tactics/backend-modules-game';
import { PlayerModule } from './player';

@Module({
  imports: [BaseGameModule, PlayerModule],
  controllers: [GameController],
  providers: [GameService],
  exports: [GameService],
})
export class GameModule {}
