import { Injectable } from '@nestjs/common';
import { entities } from '../entity';
import { InMemoryDatabaseService } from './in-memory-database.service';
import { Repository } from './repository';

export function CrudService<EntityClass extends (typeof entities)[number]>(
  entity: EntityClass
) {
  @Injectable()
  class CrudService {
    repository: Repository<InstanceType<EntityClass>>;

    constructor(databaseService: InMemoryDatabaseService) {
      this.repository = databaseService.getRepository(entity);
    }

    create(e?: Partial<InstanceType<EntityClass>>) {
      return this.repository.createOne(
        new entity(e) as InstanceType<EntityClass>
      );
    }

    getMany() {
      return this.repository.store;
    }

    getOne(id: string) {
      return this.repository.findOneOrFail(id);
    }
  }

  return CrudService;
}
