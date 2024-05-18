import { Global, Module } from '@nestjs/common';
import { InMemoryDatabaseService } from './in-memory-database.service';
import { EntitiesModule } from './entities.module';

@Global()
@Module({
  imports: [EntitiesModule],
  controllers: [],
  providers: [InMemoryDatabaseService],
  exports: [InMemoryDatabaseService],
})
export class DatabaseModule {}
