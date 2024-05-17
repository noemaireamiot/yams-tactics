import { Test, TestingModule } from '@nestjs/testing';
import { InMemoryDatabaseService } from './in-memory-database.service';

describe('DatabaseService', () => {
  let service: InMemoryDatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InMemoryDatabaseService],
    }).compile();

    service = module.get<InMemoryDatabaseService>(InMemoryDatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
