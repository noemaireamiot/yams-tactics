import { Module } from '@nestjs/common';
import { InMemoryDatabaseService } from './in-memory-database.service';

@Module({
  controllers: [],
  providers: [InMemoryDatabaseService],
  exports: [InMemoryDatabaseService],
})
export class DatabaseModule {}
